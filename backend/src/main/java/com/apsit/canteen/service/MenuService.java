package com.apsit.canteen.service;

import com.apsit.canteen.model.MenuItem;
import com.apsit.canteen.repository.MenuItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class MenuService {
    @Autowired
    private MenuItemRepository menuItemRepository;

    public List<MenuItem> getAllItems() {
        return menuItemRepository.findAll();
    }

    public MenuItem addItem(MenuItem item) {
        return menuItemRepository.save(item);
    }

    public MenuItem updateItem(Long id, MenuItem item) {
        item.setId(id);
        return menuItemRepository.save(item);
    }

    public void deleteItem(Long id) {
        menuItemRepository.deleteById(id);
    }
}
