package com.motiveko.hackingspringbootreactive;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

import java.util.logging.Level;

@Service
@RequiredArgsConstructor
public class CartService {
    private final ItemRepository itemRepository;
    private final CartRepository cartRepository;

    Mono<Cart> addToCart(String cartId, String itemId) {
        return this.cartRepository.findById(cartId)
                .log("1 : foundCart")               // reactor flow 중간에 이런식으로 log를 찍을 수 있다(가독성 상승)
                .defaultIfEmpty(new Cart(cartId))
                .log("2 : emptyCart")
                .flatMap(cart -> cart.getCartItems().stream()
                        .filter(cartItem -> cartItem.getItem().getId().equals(itemId))
                        .findAny()
                        .map(cartItem -> {
                            cartItem.increment();
                            return Mono.just(cart);
                        })
                        .orElseGet(() -> this.itemRepository.findById(itemId)
                                .log("3: fetchedItem")
                                .map(CartItem::new)
                                .log("4: cartItem", Level.SEVERE)
                                .map(cartItem -> {
                                    cart.getCartItems().add(cartItem);
                                    return cart;
                                }).log("5: addedCartItem")
                ))
                .log("6 : cartWithAnotherItem")
                .flatMap(this.cartRepository::save)
                .log("7: savedCart");
    }


}
