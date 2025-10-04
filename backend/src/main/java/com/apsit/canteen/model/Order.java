package com.apsit.canteen.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;

@Entity
@Table(name = "orders")
@Data
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private LocalDate date;
    @Column(columnDefinition = "TEXT")
    private String items;
    private int total;
    private String status;
    private String userType;
    private String userName;
    private String userEmail;
}
