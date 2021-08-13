package com.motiveko.hackingspringbootreactive;

import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.data.mongo.DataMongoTest;
import reactor.test.StepVerifier;

// @ExtendWith(SpringExtension.class) 포함되어있음
@DataMongoTest
public class MongoDbSliceTest {

    @Autowired
    ItemRepository repository;

    @Test
    void itemRepositorySavesItems() {
        Item sampleItem = new Item("name", "desc", 19.99);

        repository.save(sampleItem)
                .as(StepVerifier::create) // subscribe() 해준다
                .expectNextMatches(item -> {

                    Assertions.assertThat(item.getId()).isNotNull();
                    Assertions.assertThat(item.getName()).isEqualTo("name");
                    Assertions.assertThat(item.getDescription()).isEqualTo("desc");
                    Assertions.assertThat(item.getPrice()).isEqualTo(19.99);

                    return true;
                })
                .verifyComplete();
    }
}
