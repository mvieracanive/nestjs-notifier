<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

# Nest Notifier Module

A module for Nest.js for notifying a group of users about the execution of actions

## Description

Is usual to find applications that need to notify a subset of their users when the system executes an action. The proposed Nest module uses decorators to notify the execution of an endpoint.

Notifications are sent via email and @nest-modules/mailer helps in the task. Part of **Nest Notifier Module** configurations are also configuration options of _Mailer Module_.

This module allows to send notifications composed by a message and optionally a relative or absolute link to a resource, to a list of user emails known by its id. In addition, if user object is attached to the request, **Nest Notifier Module** can extract information from logged user and attach it to the message.

## How to use

After importing and configuring **Nest Notifier Module** is possible to use the decorator `@Notify` on each endpoint to especify that its action should be notified. It is also necessary to register an interceptor `NoticeInterceptor` in order to execute the notification after the successful execution of a decorated endpoint.

### Installation

Module is publicly registered in NPM registry, for installing it just run the following command.

```
npm install @mvieracanive/nest_notifier

```

### Registering the module

For registering the module, user should call its `forRoot()` method. As this module needs information specific to the application execution environment this is the only method provided to register the module.

```
class UserList implements EmailLists {
async getList(id: string): Promise<string[]> {
return ['id01.@dom', 'id02@dom'];
}
}

NoticeModule.forRoot({
listsProvider: UserList,
envTransport: 'ENV_EMAIL_SMTP_CONNECTION',
}),
```

All the configuration options are define in class `OptionsNoticeModule`. As it was explained, **Nest Notifier Module** sends email notifications to every user in a list of emails. Though, provider responsible for geting the list of emails should be supplied to the module during configuration. To accomplish this are defined the following options:

```
listsImports: any[]; //All modules that should be imported to load ListsProvider
listsProvider: any; //Provider implementing interface EmailLists. This class is responsible for returning a list of user emails by user group id
```

**Nest Notifier Module** needs to provide to [_Mailer Module_](https://github.com/nest-modules/mailer) information to configure itself, such as transport. It is usual in this implementation to trust on environmental variables as is shown bellow. The user of this module should take into account that those variables should be set beforehand.

```
envTransport: string; //Environmental variable holding data for mailer transport options
from?: string; //Option "form" form Mailer
```

For managing relative links, **Nest Notifier Module** should know the port in which application is running and if a prefix had been set to the application, for satisfying this requirements are define the following options:

```
envAppPort?: string; //Environmental variable holding application port
envAppName?: string; // Environmental variable holding application prefix
```

In case user object is attached to the request it is possible to configure user object properties holding contact and company information. Know the properties would allow **Nest Notifier Module** to extract user data to enrich notification.

```
userContactField?: string; //Property name of user object where could be found contact data
userCompanyField?: string; //Property name of user object where could be found company data
```

### Decorating endpoints

As it was explained, this module allows to mark endpoints which execution should be notified to a list of users. Setting a `@Notify` decorator to an endpoint would guarantee the appropriate notification is sent.

```
@Get()
@Notify({
msg: 'System notifies you about the execution of endpoint 1',
emailListID: 'All Registered Users',
absoluteRefResource: 'https://youcanaccessresource.here.com'
})
endpoint1() {
return 'Return endpoint 1 and it was notified';
}
```

### Using interceptor

The final piece of puzzle is to use the interceptor `NoticeInterceptor`. Probably in must cases this interceptor should be registered globally, as Notifications may be transversal to all the business logic, if this is the case, developer can do this as follows in bootstrapping function.

```
const noticeService = app.get(NoticeService);
const reflector = app.get(Reflector);
app.useGlobalInterceptors(new NoticeInterceptor(noticeService, reflector));
```

## License

Nest Notifier is [MIT licensed](LICENSE).
