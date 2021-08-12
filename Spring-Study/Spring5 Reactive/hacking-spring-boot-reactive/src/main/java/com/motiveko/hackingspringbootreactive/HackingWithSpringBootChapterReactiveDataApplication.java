package com.motiveko.hackingspringbootreactive;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.thymeleaf.TemplateEngine;
import reactor.blockhound.BlockHound;

@SpringBootApplication
public class HackingWithSpringBootChapterReactiveDataApplication {

	public static void main(String[] args) {
		// 블로킹 코드 검출
		// BlockHound.install();
		// Thymleaf의 FileInputStream.readBytes() 내 TemplateEngine.process() 를 허용한다.
		BlockHound.builder()
				.allowBlockingCallsInside(
						TemplateEngine.class.getCanonicalName(), "process"
				).install();
		SpringApplication.run(HackingWithSpringBootChapterReactiveDataApplication.class, args);
	}

}
