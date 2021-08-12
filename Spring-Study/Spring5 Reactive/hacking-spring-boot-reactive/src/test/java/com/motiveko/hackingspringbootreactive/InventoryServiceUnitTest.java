package com.motiveko.hackingspringbootreactive;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

import static org.mockito.Mockito.*;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import reactor.core.publisher.Mono;
import reactor.test.StepVerifier;

import java.util.Collections;

import static org.assertj.core.api.Assertions.*;
//import static org.mockito.Mockito.when;

//import static org.assertj.core.api.Assertions.*;

@ExtendWith(SpringExtension.class)
class InventoryServiceUnitTest {

    InventoryService inventoryService;

    // itemRepository = mock(ItemRepository.class); 해주는 것과 같다.
    @MockBean
    private ItemRepository itemRepository;

    @MockBean
    private CartRepository cartRepository;

    @BeforeEach
    void setUp() {
        Item sampleItem = new Item("item1", "TV tray", "Alf TV Tray", 19.99);
        CartItem sampleCartItem = new CartItem(sampleItem);
        Cart sampleCart = new Cart("My Cart", Collections.singletonList(sampleCartItem));

        when(cartRepository.findById(anyString())).thenReturn(Mono.empty());
        when(itemRepository.findById(anyString())).thenReturn(Mono.just(sampleItem));
        when(cartRepository.save(any(Cart.class))).thenReturn(Mono.just(sampleCart));


        this.inventoryService = new InventoryService(itemRepository, cartRepository);
    }

    /**
     * 탑레벨 방식 테스트
     * 테스트 대상 메소드 호출부를 맨 먼저 배치하고 as()연산자로 결괏값을 StepVerifier로 흘려보내는 방식
     */
    @Test
    void addItemToEmptyCartShouldProduceOneCartItem() {
        inventoryService.addItemToCart("My Cart", "item1")
                .as(StepVerifier::create) // StepVerifier가 Publisher를 구독해준다
                .expectNextMatches(cart -> { // Mono를 구독했을 때 next()는 결과가 반영된 cart, 이 카트가 match 되어야하는 내용을 넣는다
                    assertThat(cart.getCartItems()).extracting(CartItem::getQuantity)
                            .containsExactlyInAnyOrder(1);
                            // .isEqualTo(1);

                    assertThat(cart.getCartItems()).extracting(CartItem::getItem)
                            .containsExactly(new Item("item1", "TV tray", "Alf TV Tray", 19.99));

                    return true;
                })
                .verifyComplete();

    }

    @Test
    void alternativeWayToTest() {
        StepVerifier.create(
                inventoryService.addItemToCart("My Cart", "item1"))
                .expectNextMatches(cart -> {
                    assertThat(cart.getCartItems()).extracting(CartItem::getQuantity)
                            .containsExactlyInAnyOrder(1);

                    assertThat(cart.getCartItems()).extracting(CartItem::getItem)
                            .containsExactly(new Item("item1", "TV tray", "Alf TV Tray", 19.99));

                    return true;
                })
                .verifyComplete();
    }

}