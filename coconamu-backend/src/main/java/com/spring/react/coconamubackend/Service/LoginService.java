package com.spring.react.coconamubackend.Service;

import java.util.Random;

import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring6.SpringTemplateEngine;

import com.spring.react.coconamubackend.Entity.EmailMessage;
import com.spring.react.coconamubackend.Entity.UserEntity;
import com.spring.react.coconamubackend.Repository.UserRepository;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class LoginService {

    private final UserRepository userRepository;
    private final JavaMailSender javaMailSender;
    private final SpringTemplateEngine templateEngine;

    @Transactional
    public void join(UserEntity user) {

        if (user != null) {
            userRepository.save(user);
        }
    }

    public String findUser(String id) {
        if (userRepository.findById(id).isEmpty()) {
            return "";
        } else {
            return "중복";
        }

    }

    public String sendMail(EmailMessage emailMessage, String type) {
        String authNum = createCode();

        MimeMessage mimeMessage = javaMailSender.createMimeMessage();
        try {
            MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage, false, "UTF-8");
            mimeMessageHelper.setTo(emailMessage.getToUser()); // 메일 수신자
            mimeMessageHelper.setSubject(emailMessage.getSubject()); // 메일 제목
            mimeMessageHelper.setText(setContext(authNum, type), true); // 메일 본문 내용, HTML 여부
            javaMailSender.send(mimeMessage);

            return authNum;

        } catch (MessagingException e) {
            throw new RuntimeException(e);
        }
    }

    // 인증코드 생성 메소드
    public String createCode() {
        Random random = new Random();
        StringBuffer key = new StringBuffer();

        for (int i = 0; i < 8; i++) {
            int index = random.nextInt(4);

            switch (index) {
                case 0:
                    key.append((char) ((int) random.nextInt(26) + 97));
                    break;
                case 1:
                    key.append((char) ((int) random.nextInt(26) + 65));
                    break;
                default:
                    key.append(random.nextInt(9));
            }
        }
        return key.toString();
    }

    public String setContext(String code, String type) {
        Context context = new Context();
        context.setVariable("code", code);
        return templateEngine.process(type, context);
    }
}
