package com.automate.framework.config;

import java.io.IOException;
import java.io.InputStream;
import java.time.Duration;
import java.util.Properties;

public final class FrameworkConfig {
    private static final Properties PROPERTIES = loadProperties();

    private FrameworkConfig() {
    }

    public static String get(String key) {
        String value = System.getProperty(key);
        if (value == null || value.isBlank()) {
            value = PROPERTIES.getProperty(key);
        }
        if (value == null || value.isBlank()) {
            throw new IllegalArgumentException("Missing configuration value: " + key);
        }
        return value.trim();
    }

    public static Duration getDuration(String key) {
        return Duration.ofSeconds(Long.parseLong(get(key)));
    }

    private static Properties loadProperties() {
        Properties properties = new Properties();
        try (InputStream input = FrameworkConfig.class.getClassLoader()
                .getResourceAsStream("config.properties")) {
            if (input == null) {
                throw new IllegalStateException("config.properties was not found on the classpath");
            }
            properties.load(input);
            return properties;
        } catch (IOException exception) {
            throw new IllegalStateException("Unable to load config.properties", exception);
        }
    }
}
