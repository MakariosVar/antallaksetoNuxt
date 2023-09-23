<template>
  <footer class="footer mt-auto py-3">
    <div class="container">
      <div class="row align-items-center">
        <div class="col-lg-3 mx-auto mb-4 d-flex justify-content-center">
          <nuxt-link to="/home" class="navbar-brand w-50">
            <img src="~assets/images/NewLogoPNG.svg" alt="Logo" class="img-fluid u-logo-image " />
          </nuxt-link>
        </div>

        <div class="col-lg-4 mx-auto mb-4 text-center">
          <p class="text-center">
            {{ new Date().getFullYear() }}  All Rights Reserved ©  Antallakseto.gr
          </p>
          <p class="text-center">Development By <a href="#"> MAK.</a></p>
        </div>

        <div class="col-lg-3 mx-auto mb-4 text-center">
          <div class="u-social-icons">
            <!-- Replace the social media links with font-awesome-icon and Bootstrap icons -->
            <a title="facebook" target="_blank" class="text-dark" href="https://www.facebook.com/%CE%91%CE%BD%CF%84%CE%B1%CE%BB%CE%BB%CE%B1%CE%BE%CE%AD%CE%A4%CE%BFgr-109427185179999">
              <font-awesome-icon :icon="['fab', 'facebook']" class="me-2" />
            </a>
            <a title="twitter" target="_blank" class="text-dark" href="https://twitter.com/antallaxe">
              <font-awesome-icon :icon="['fab', 'twitter']" class="me-2" />
            </a>
            <a title="instagram" target="_blank" class="text-dark" href="https://www.instagram.com/antallaxeto.gr/">
              <font-awesome-icon :icon="['fab', 'instagram']" class="me-2" />
            </a>
            <a target="_blank" class="text-dark" href="https://discord.gg/6DR43sZ27V" title="discord">
              <font-awesome-icon :icon="['fab', 'discord']" class="me-2" />
            </a>
            <nuxt-link to="/info" class="navbar-brand">
              <font-awesome-icon :icon="['fas', 'circle-info']" class="me-2"/>
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>