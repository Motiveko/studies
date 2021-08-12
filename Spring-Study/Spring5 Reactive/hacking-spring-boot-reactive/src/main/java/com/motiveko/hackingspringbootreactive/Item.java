package com.motiveko.hackingspringbootreactive;

import lombok.*;
import org.springframework.data.annotation.Id;

import java.awt.*;
import java.util.Date;


@Data
@NoArgsConstructor
@RequiredArgsConstructor
public class Item {


    private @Id String id;
    @NonNull
    private String name;
    @NonNull
    private String description;
    @NonNull
    private double price;

    public Item (String id, String name, String description, double price) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
    }

    private String distributorRegion;
    private Date releaseDate;
    private int availableUnits;
    private Point location;
    private boolean active;
}
