package com.motiveko.hackingspringbootreactive.part3;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Hooks;
import reactor.core.publisher.Mono;
import reactor.core.scheduler.Schedulers;

import java.util.Random;

@Component
public class ReactorDebuggingExample implements CommandLineRunner {
    @Override
    public void run(String... args) throws Exception {
        Hooks.onOperatorDebug();
        boolean ran = true;
        Mono<Integer> source = Flux.just(1,2,3,4).elementAt(5);
        while(ran) {
            if( ran = new Random().nextBoolean()) {
                source = Flux.range(1, 10).elementAt(5);
            } else {
                source = Flux.just(1,2,3,4).elementAt(5);
            }
        }
        source.subscribeOn(Schedulers.parallel())
                .block();
        System.out.println("");
    }
}
