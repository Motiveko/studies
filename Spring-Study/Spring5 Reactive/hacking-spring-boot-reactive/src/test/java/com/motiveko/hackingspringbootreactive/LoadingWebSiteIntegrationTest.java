package com.motiveko.hackingspringbootreactive;

import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.reactive.AutoConfigureWebTestClient;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.reactive.server.WebTestClient;


// @SpringBootTest로 실제 애플리케이션을 구동하게 만든다. @SpringBootApplication이 붙은 클래스를 찾아 내장 컨테이너를 실행하고, RANDOM_PORT를 바인딩한다.
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
// 어플리케이션에 요청을 날리는 WebTestClient 인스턴스 생성
@AutoConfigureWebTestClient
public class LoadingWebSiteIntegrationTest {

    // WebTestClient는 내부적으로 WebClient를 이용해서 HttpRequest를 날려 테스트를한다.
    @Autowired
    WebTestClient client;

    @Test
    void Test() {
        client.get().uri("/").exchange()
                .expectStatus().isOk()
                .expectHeader().contentType(MediaType.TEXT_HTML)
                .expectBody(String.class)
                .consumeWith(exchangeResult -> {
                    Assertions.assertThat(exchangeResult.getResponseBody()).contains("<input type=\"submit\" value=\"Add to Cart\" />");
                });
    }

}
