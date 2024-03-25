package com.spring.react.coconamubackend.Entity;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class EmailMessage {

    public String toUser;

    public String subject;

    public String message;
}
