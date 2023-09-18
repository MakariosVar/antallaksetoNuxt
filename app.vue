<template>
  <div>
    <ClientOnly>
        <LayoutHeaderVue :user="null" :loggedin="false" />
        <router-view />
        <LayoutFooterVue />
    </ClientOnly>
  </div>
</template>
