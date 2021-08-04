package com.motiveko.hackingspringbootreactive;

import lombok.*;
import org.springframework.data.annotation.Id;


@Data
@NoArgsConstructor
@RequiredArgsConstructor
public class Item {
    private @Id String id;
    @NonNull
    private String name;
    @NonNull
    private double price;

}
