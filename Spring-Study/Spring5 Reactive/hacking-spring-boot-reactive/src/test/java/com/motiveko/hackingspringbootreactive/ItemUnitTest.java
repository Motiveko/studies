package com.motiveko.hackingspringbootreactive;

import static org.assertj.core.api.Assertions.*;
import org.junit.jupiter.api.Test;

public class ItemUnitTest {
    @Test
    void itemBasicsShouldWork() {
        Item sampleItem = new Item("item1", "TV tray","Alf Tv Tray", 19.99);
        assertThat(sampleItem.getId()).isEqualTo("item1");


    }
}
