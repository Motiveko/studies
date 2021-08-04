package com.motiveko.hackingspringbootreactive;

import lombok.Data;
import lombok.NonNull;

@Data
public class CartItem {

    @NonNull
    private Item item;
    @NonNull
    private int quantity;


}
