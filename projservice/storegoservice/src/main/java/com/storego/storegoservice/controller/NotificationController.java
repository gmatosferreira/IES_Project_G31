package com.storego.storegoservice.controller;


import com.storego.storegoservice.exception.ResourceNotFoundException;
import com.storego.storegoservice.model.Notification;
import com.storego.storegoservice.model.NotificationType;
import com.storego.storegoservice.repository.NotificationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
public class NotificationController {

    @Autowired
    private NotificationRepository notificationRepository;

    @GetMapping("/work/notifications_help")
    public ResponseEntity<Map<String, Object>> getHelpNotifications(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size){
        try {
            List<Notification> notifications = new ArrayList<>();
            Pageable paging = PageRequest.of(page, size);

            Page<Notification> pageNots;

            pageNots = notificationRepository.findAllByTypeOrderByDateDesc(NotificationType.HELP, paging);

            notifications = pageNots.getContent();


            Map<String, Object> response = new HashMap<>();
            response.put("notifications", notifications);
            response.put("currentPage", pageNots.getNumber());
            response.put("totalItems", pageNots.getTotalElements());
            response.put("totalPages", pageNots.getTotalPages());

            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/admin/notifications_full_store")
    public ResponseEntity<Map<String, Object>> getFullStoreNotifications(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size){
        try {
            List<Notification> notifications = new ArrayList<>();
            Pageable paging = PageRequest.of(page, size);

            Page<Notification> pageNots;

            pageNots = notificationRepository.findAllByTypeOrderByDateDesc(NotificationType.STORE_FULL,paging);

            notifications = pageNots.getContent();


            Map<String, Object> response = new HashMap<>();
            response.put("notifications", notifications);
            response.put("currentPage", pageNots.getNumber());
            response.put("totalItems", pageNots.getTotalElements());
            response.put("totalPages", pageNots.getTotalPages());

            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/admin/notifications_restock")
    public ResponseEntity<Map<String, Object>> getRestockNotifications(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size){
        try {
            List<Notification> notifications = new ArrayList<>();
            Pageable paging = PageRequest.of(page, size);

            Page<Notification> pageNots;

            pageNots = notificationRepository.findAllByTypeOrderByDateDesc(NotificationType.RESTOCK,paging);

            notifications = pageNots.getContent();

            Map<String, Object> response = new HashMap<>();
            response.put("notifications", notifications);
            response.put("currentPage", pageNots.getNumber());
            response.put("totalItems", pageNots.getTotalElements());
            response.put("totalPages", pageNots.getTotalPages());

            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    //Use for edit state of help notifications
    @PutMapping("/work/notifications_help/{id}")
    public ResponseEntity<Notification> updateHelpNotification(@PathVariable(value = "id") String notificationId,
                                                 @Valid @RequestBody Notification notificationDetails) throws ResourceNotFoundException {

        //TODO warn script
        Notification notification = notificationRepository.findById(notificationId)
                .orElseThrow(() -> new ResourceNotFoundException("Notification not found for this id: " + notificationId));

        if (notificationDetails.getState() != null && notification.getType() == NotificationType.HELP) {
            notification.setState(notificationDetails.getState());
        }

        Notification updatedNot = notificationRepository.save(notification);
        return ResponseEntity.ok(updatedNot);
    }


}