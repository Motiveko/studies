package com.motiveko.hackingspringbootreactive;

import lombok.Data;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;

@Data
public class CartItem {

    @NonNull
    private Item item;
    private int quantity;

    public CartItem (Item item) {
        this.item = item;
        this.quantity = 1;
    }


    public void increment() {
        this.quantity++;
    }
}
