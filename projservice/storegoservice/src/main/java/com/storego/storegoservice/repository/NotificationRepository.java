package com.storego.storegoservice.repository;

import com.storego.storegoservice.model.HelpNeededState;
import com.storego.storegoservice.model.Notification;
import com.storego.storegoservice.model.NotificationType;
import com.storego.storegoservice.model.Transaction;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NotificationRepository extends MongoRepository<Notification, String> {
    List<Notification> findByTypeAndAndState(Integer type, HelpNeededState state);
    List<Notification> findByNif(long nif);
    Page<Notification> findAllByTypeOrderByDateDesc(NotificationType type, Pageable pageable);


}
