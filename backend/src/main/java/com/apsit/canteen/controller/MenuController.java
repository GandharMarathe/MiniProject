package com.apsit.canteen.controller;

import com.apsit.canteen.model.MenuItem;
import com.apsit.canteen.service.MenuService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/menu")
public class MenuController {
    @Autowired
    private MenuService menuService;

    @GetMapping
    public List<MenuItem> getAllItems() {
        return menuService.getAllItems();
    }

    @PostMapping
    public MenuItem addItem(@RequestBody MenuItem item) {
        return menuService.addItem(item);
    }

    @PutMapping("/{id}")
    public MenuItem updateItem(@PathVariable Long id, @RequestBody MenuItem item) {
        return menuService.updateItem(id, item);
    }

    @DeleteMapping("/{id}")
    public void deleteItem(@PathVariable Long id) {
        menuService.deleteItem(id);
    }
}
