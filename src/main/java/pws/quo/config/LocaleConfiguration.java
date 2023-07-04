package pws.quo.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.LocaleResolver;
import org.springframework.web.servlet.config.annotation.*;
import org.springframework.web.servlet.i18n.FixedLocaleResolver;
import org.springframework.web.servlet.i18n.LocaleChangeInterceptor;
import tech.jhipster.config.locale.AngularCookieLocaleResolver;
import org.springframework.web.servlet.LocaleResolver;
import org.springframework.web.servlet.i18n.LocaleChangeInterceptor;

import java.util.Locale;

@Configuration
public class LocaleConfiguration implements WebMvcConfigurer {

    @Override
    public void addViewControllers(ViewControllerRegistry registry) {
//        registry.addViewController("/{spring:\\w+}")
//            .setViewName("forward:/");
//        registry.addViewController("/**/{spring:\\w+}")
//            .setViewName("forward:/");
//        registry.addViewController("/{spring:\\w+}/**{spring:?!(\\.js|\\.css)$}")
//            .setViewName("forward:/");

        registry.addViewController("/{spring:\\w+}")
            .setViewName("forward:/index");
        registry.addViewController("/**/{spring:\\w+}")
            .setViewName("forward:/index");
        registry.addViewController("/{spring:\\w+}/**{spring:?!(\\.js|\\.css)$}")
            .setViewName("forward:/index");

//        registry.addViewController("/{spring:\\w+}")
//            .setViewName("forward:/");
//        registry.addViewController("/**/{spring:\\w+}")
//            .setViewName("forward:/");
//        registry.addViewController("/{spring:^(?!.*\\.(js|css)$).*}/**")
//            .setViewName("forward:/");
    }

    @Bean
    public LocaleResolver localeResolver() {
        return new FixedLocaleResolver(Locale.US);
//        AngularCookieLocaleResolver cookieLocaleResolver = new AngularCookieLocaleResolver();
//        cookieLocaleResolver.setCookieName("NG_TRANSLATE_LANG_KEY");
//        return cookieLocaleResolver;
    }
//
//    @Override
//    public void addInterceptors(InterceptorRegistry registry) {
//
//        LocaleChangeInterceptor localeChangeInterceptor = new LocaleChangeInterceptor();
//        localeChangeInterceptor.setParamName("language");
//        registry.addInterceptor(localeChangeInterceptor);
//    }
}
