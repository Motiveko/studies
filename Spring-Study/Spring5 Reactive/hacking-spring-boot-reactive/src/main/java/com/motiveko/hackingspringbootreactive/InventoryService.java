package com.motiveko.hackingspringbootreactive;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.ExampleMatcher;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class InventoryService {

    private final ItemRepository itemRepository;
    private final CartRepository cartRepository;

    public Flux<Item> getInventory() {
        return this.itemRepository.findAll();
    }

    public Mono<Cart> getCart(String cartId) {
        return this.cartRepository.findById(cartId);
    }

    // 개어려움
    public Mono<Cart> addItemToCart(String cartId, String itemId) {
        return this.cartRepository.findById(cartId)
                .defaultIfEmpty(new Cart(cartId))
                .flatMap(cart -> cart.getCartItems().stream()
                        .filter(cartItem -> cartItem.getItem().getId().equals(itemId))
                        .findAny()
                        .map(cartItem -> {
                            cartItem.increment();
                            return Mono.just(cart);
                        })
                        .orElseGet(() -> {
                            return itemRepository.findById(itemId)
                                    .map(CartItem::new)
                                    .map(cartItem -> {
                                        cart.getCartItems().add(cartItem);
                                        return cart;
                                    });
                        }))
                .flatMap(cartRepository::save);

    }

    public Mono<Cart> removeOneFromCart(String cartId, String itemId) {
        return this.cartRepository.findById(cartId)
                .defaultIfEmpty(new Cart(cartId)) // cart를 찾을수 없으면 exception을 던져야 하는게 아닌가?
                .flatMap(cart -> cart.getCartItems().stream()
                        .filter(cartItem -> cartItem.getItem().getId().equals(itemId))
                        .findAny()
                        .map(cartItem -> {
                            cartItem.decrement();
                            return Mono.just(cart);
                        })
                        .orElseGet(Mono::empty))
                .map(cart -> new Cart(cart.getId(), cart.getCartItems().stream()
                        .filter(cartItem -> cartItem.getQuantity() > 0)
                        .collect(Collectors.toList())))
                .flatMap(cartRepository::save);

    }

    public Mono<Item> saveItem(Item newItem) {
        return itemRepository.save(newItem);
    }

    public Mono<Void> deleteItem(String itemId) {
        return itemRepository.deleteById(itemId);
    }

    Flux<Item> searchByExample(String name, String description, boolean useAnd) {
        Item item = new Item(name, description, 0.0);

        ExampleMatcher matcher = (useAnd
                ? ExampleMatcher.matchingAll()
                : ExampleMatcher.matchingAny()
                .withStringMatcher(ExampleMatcher.StringMatcher.CONTAINING)
                .withIgnoreCase()
                .withIgnorePaths("price"));

        Example<Item> probe = Example.of(item, matcher);
        return itemRepository.findAll(probe);
    }


}
