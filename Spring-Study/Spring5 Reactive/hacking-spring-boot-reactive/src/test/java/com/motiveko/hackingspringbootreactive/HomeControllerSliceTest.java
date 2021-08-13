package com.motiveko.hackingspringbootreactive;

import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.reactive.WebFluxTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.reactive.server.WebTestClient;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

// 이 테스트 케이스가 HomeController에 국한된 스프링 웹플럭스 슬라이스 테스트를 사용하도록 설정
@WebFluxTest(HomeController.class)
public class HomeControllerSliceTest {

    @Autowired
    private WebTestClient client;

    @MockBean
    InventoryService inventoryService;

    @Test
    void homePage() {
        // given
        Mockito.when(inventoryService.getInventory())
            .thenReturn(Flux.just(
                new Item("id1", "name1", "desc1", 1.99),
                new Item("id2", "name2", "desc2", 9.99)
        ));
        Mockito.when(inventoryService.getCart("My Cart"))
                .thenReturn(Mono.just(new Cart("My Cart")));

        // then
        client.get().uri("/").exchange()
                .expectStatus().isOk()
                .expectBody(String.class)
                .consumeWith(exchangeResult -> {
                    String responseBody = exchangeResult.getResponseBody();

                    Assertions.assertThat(responseBody).contains("action=\"/add/id1\"");
                    Assertions.assertThat(responseBody).contains("action=\"/add/id2\"");

                });

    }
}
