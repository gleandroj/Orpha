<!DOCTYPE html>
<html>
<head>
    <meta name="viewport" content="initial-scale=1, maximum-scale=1, user-scalable=no" />
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Roboto+Mono:400,500,700" rel="stylesheet">
    <link rel="stylesheet" href="/bower/angular-material/angular-material.css">
    <link rel="stylesheet" href="/bower/angular-material-expansion-panel/dist/md-expansion-panel.css">
    <link rel="stylesheet" href="/assets/orpha.css">
    <title>{{config('app.name')}}</title>
</head>
<body ng-app="orpha">

<ui-view layout="row" layout-fill></ui-view>

<script src="/bower/moment/moment.js"></script>
<script src="/bower/angular/angular.js"></script>
<script src="/bower/angular-resource/angular-resource.js"></script>
<script src="/bower/angular-ui-router/release/angular-ui-router.js"></script>
<script src="/bower/angular-aria/angular-aria.js"></script>
<script src="/bower/angular-messages/angular-messages.js"></script>
<script src="/bower/angular-animate/angular-animate.js"></script>
<script src="/bower/angular-material/angular-material.js"></script>
<script src="/bower/angular-material-expansion-panel/dist/md-expansion-panel.js"></script>
<script src="/bower/ngMask/dist/ngMask.js"></script>
<script src="/bower/angular-filter/dist/angular-filter.js"></script>
<script src="/bower/chart.js/dist/Chart.js"></script>
<script src="/bower/angular-chart.js/dist/angular-chart.js"></script>

<script src="/app/app.modules.js"></script>
<script src="/app/app.config.js"></script>
<script src="/app/app.routes.js"></script>
<script src="/app/app.directives.js"></script>

<script src="/app/services/storage-svc.js"></script>
<script src="/app/services/messages-svc.js"></script>
<script src="/app/services/users-svc.js"></script>
<script src="/app/services/criancas-svc.js"></script>
<script src="/app/services/auth-svc.js"></script>
<script src="/app/services/cam-svc.js"></script>

<script src="/app/components/dashboard/dashboard-cmp.js"></script>
<script src="/app/components/orpha/orpha-cmp.js"></script>
<script src="/app/components/users/users-cmp.js"></script>
<script src="/app/components/auth/auth-cmp.js"></script>
<script src="/app/components/criancas/criancas-cmp.js"></script>
<script src="/app/components/criancas/dados/dados-cmp.js"></script>
<script src="/app/components/profile/profile-cmp.js"></script>

</body>
</html>