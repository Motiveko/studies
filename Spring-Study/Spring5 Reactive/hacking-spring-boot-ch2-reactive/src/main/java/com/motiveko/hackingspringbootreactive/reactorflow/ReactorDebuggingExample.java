package com.motiveko.hackingspringbootreactive.reactorflow;

import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Hooks;
import reactor.core.publisher.Mono;
import reactor.core.scheduler.Schedulers;

import java.util.Random;

//@Component
@Slf4j
public class ReactorDebuggingExample implements CommandLineRunner {
    @Override
    public void run(String... args) throws Exception {

        // 이걸 붙이면 마법같이 stack trace가 쓰레드를 넘어다닌다. -> 엄청난 비용 발생
        Hooks.onOperatorDebug();
        boolean ran = true;
        Mono<Integer> source = Flux.just(1,2,3,4).elementAt(5);
        while(ran) {
            if( ran = new Random().nextBoolean()) {
                source = Flux.range(1, 10).elementAt(5);
            } else {
                source = Flux.just(1,2,3,4).elementAt(5);
                log.info("source 값 마지막 할당");
            }
        }
        // reactor의 scheduler로 비동기, 논블로킹으로 다른 쓰레드에서 실행된다. -> 위의 source값이 어디서 할당됐는지 추적하지 못함
        source.subscribeOn(Schedulers.parallel())
                .block();
        System.out.println("");
    }
}
