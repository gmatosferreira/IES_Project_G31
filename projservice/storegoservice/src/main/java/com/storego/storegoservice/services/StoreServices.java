package com.storego.storegoservice.services;
import com.storego.storegoservice.model.*;
import com.storego.storegoservice.repository.CartProductRepository;
import com.storego.storegoservice.repository.CartRepository;
import com.storego.storegoservice.repository.ProductRepository;
import com.storego.storegoservice.repository.NotificationRepository;
import org.springframework.expression.ExpressionException;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.Set;
import java.util.HashSet;

// Connection to DB
import org.springframework.beans.factory.annotation.Autowired;
import com.storego.storegoservice.exception.ResourceNotFoundException;
import com.storego.storegoservice.repository.PersonRepository;

import javax.persistence.EntityNotFoundException;
import javax.transaction.Transactional;

@Service
public class StoreServices {

    @Autowired
    private PersonRepository personRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private CartProductRepository cartProductRepository;

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private NotificationRepository notificationRepository;

    private Set<Person> clientsInStore;
    private int maxClients;


    public StoreServices() {
        this.clientsInStore = new HashSet<>();
        this.maxClients = 5;
    }

    public Set<Person> getClientsInStore() {
        return clientsInStore;
    }

    public void enterStore(Long nif){
        // Check if max number of clients has been reached
        if (cartRepository.count() > this.maxClients) {
            System.out.println("MAX NUMBER OF CLIENTS HAS BEEN REACHED!");
            Notification n = new Notification(NotificationType.STORE_FULL);
            System.out.println(n);
            notificationRepository.save(n);
            return;
        }
        Person p = personRepository.findByNif(nif);
        String format = "Entered the store!";
        // Create cart on database
        if (cartRepository.findByPersonNif(nif) == null) {
            Cart c = new Cart(p);
            cartRepository.save(c);
            p.setCart(c);
            p.setLast_visit(new Date());
            personRepository.save(p);
        } else {
            format = "ERROR! Entered but was already in store!";
        }
        // Add client to in store list
        clientsInStore.add(p);
        // Output fedback
        System.out.println(String.format("%d (%s) " + format, nif, p.getName()));
    }

    public void leaveStore(Long nif){
        Person p = personRepository.findByNif(nif);
        String format = "Left the store!";
        // Delete cart from database
        if (cartRepository.findByPersonNif(nif) != null) {
            Cart c = cartRepository.findByPersonNif(nif);
            System.out.println(c.getId());
            p.setCart(null);
            personRepository.save(p);
            cartRepository.delete(c);
            cartRepository.flush();
            if (cartRepository.findByPersonNif(nif) != null) {
                System.out.println("ERRRRRROOOOOORRR! Removed but still on database!");
            }
        } else {
            format = "ERROR! Left but was not in store!";
        }
        // Remove client from in store list
        clientsInStore.remove(p);
        // Output feedback
        System.out.println(String.format("%d (%s) " + format, nif, p.getName()));
    }

}
