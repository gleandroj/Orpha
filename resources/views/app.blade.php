<!DOCTYPE html>
<html>
<head>
    <meta name="viewport" content="initial-scale=1, maximum-scale=1, user-scalable=no" />
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Roboto+Mono:400,500,700" rel="stylesheet">
    <link rel="stylesheet" href="/bower/angular-material/angular-material.css">
    <link rel="stylesheet" href="/bower/orpha.css">
</head>
<body ng-app="orpha">

<ui-view layout="row" layout-fill></ui-view>

<script src="/bower/angular/angular.js"></script>
<script src="/bower/angular-resource/angular-resource.js"></script>
<script src="/bower/angular-ui-router/release/angular-ui-router.js"></script>
<script src="/bower/angular-aria/angular-aria.js"></script>
<script src="/bower/angular-messages/angular-messages.js"></script>
<script src="/bower/angular-animate/angular-animate.js"></script>
<script src="/bower/angular-material/angular-material.js"></script>
<script src="/bower/ngMask/dist/ngMask.js"></script>

<script src="/app/app.modules.js"></script>
<script src="/app/app.config.js"></script>
<script src="/app/app.routes.js"></script>

<script src="/app/services/messages-svc.js"></script>
<script src="/app/services/users-svc.js"></script>
<script src="/app/services/auth-svc.js"></script>

<script src="/app/components/orpha/orpha-cmp.js"></script>
<script src="/app/components/users/users-cmp.js"></script>
<script src="/app/components/login/login-cmp.js"></script>

</body>
</html>