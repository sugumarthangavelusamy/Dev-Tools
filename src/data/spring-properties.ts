export interface SpringProperty {
    key: string;
    defaultValue?: string;
    description: string;
}

export const springProperties: SpringProperty[] = [
    { key: 'server.port', defaultValue: '8080', description: 'Server HTTP port.' },
    { key: 'server.servlet.context-path', defaultValue: '', description: 'Context path of the application.' },
    { key: 'spring.application.name', defaultValue: '', description: 'Application name.' },
    { key: 'spring.datasource.url', defaultValue: '', description: 'JDBC URL of the database.' },
    { key: 'spring.datasource.username', defaultValue: '', description: 'Login username of the database.' },
    { key: 'spring.datasource.password', defaultValue: '', description: 'Login password of the database.' },
    { key: 'spring.jpa.hibernate.ddl-auto', defaultValue: 'none', description: 'DDL mode. This is actually a shortcut for the "hibernate.hbm2ddl.auto" property.' },
    { key: 'spring.jpa.show-sql', defaultValue: 'false', description: 'Enable logging of SQL statements.' },
    { key: 'logging.level.*', defaultValue: '', description: 'Log level severity mapping. For instance "logging.level.org.springframework=DEBUG".' },
    { key: 'spring.main.banner-mode', defaultValue: 'console', description: 'Mode used to display the banner when the application runs.' },
    { key: 'spring.profiles.active', defaultValue: '', description: 'Comma-separated list of active profiles.' },
    { key: 'spring.jackson.date-format', defaultValue: '', description: 'Date format string or fully-qualified date format class name.' },
    { key: 'spring.servlet.multipart.max-file-size', defaultValue: '1MB', description: 'Max file size.' },
    { key: 'spring.servlet.multipart.max-request-size', defaultValue: '10MB', description: 'Max request size.' },
    { key: 'management.endpoints.web.exposure.include', defaultValue: 'health,info', description: 'Endpoint IDs that should be included or "*" for all.' },
    { key: 'spring.h2.console.enabled', defaultValue: 'false', description: 'Whether to enable the H2 Console.' },
    // Add more as needed
];
