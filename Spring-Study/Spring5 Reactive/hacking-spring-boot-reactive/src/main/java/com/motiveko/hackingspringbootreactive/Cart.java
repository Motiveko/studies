package com.motiveko.hackingspringbootreactive;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NonNull;
import org.springframework.data.annotation.Id;

import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
public class Cart {

    @NonNull
    private @Id String id;
    private List<CartItem> cartItems;

    private Cart() {

    }
    public Cart(String id) {
        this(id, new ArrayList<>());
    }

}
