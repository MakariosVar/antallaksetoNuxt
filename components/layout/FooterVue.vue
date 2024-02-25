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
          <p class="text-center my-1">
            {{ new Date().getFullYear() }}  All Rights Reserved ©  Antallakseto.gr
          </p>
          <p class="text-center my-1" style="font-size: 0.9rem;"><nuxt-link to="/terms" class="text-black">Όροι χρήσης και πολιτική απορρήτου</nuxt-link></p>
        </div>

        <div class="col-lg-3 mx-auto mb-4 text-center">
          <div class="u-social-icons">
            <!-- Replace the social media links with font-awesome-icon and Bootstrap icons -->
            <a title="facebook" target="_blank" class="text-dark" href="https://www.facebook.com/%CE%91%CE%BD%CF%84%CE%B1%CE%BB%CE%BB%CE%B1%CE%BE%CE%AD%CE%A4%CE%BFgr-109427185179999">
              <ClientOnly>
                <font-awesome-icon :icon="['fab', 'facebook']" class="me-2" />
              </ClientOnly>
            </a>
            <a title="twitter" target="_blank" class="text-dark" href="https://twitter.com/antallaxe">
              <ClientOnly>
                <font-awesome-icon :icon="['fab', 'twitter']" class="me-2" />
              </ClientOnly>
            </a>
            <a title="instagram" target="_blank" class="text-dark" href="https://www.instagram.com/antallakseto.gr/">
              <ClientOnly>
                <font-awesome-icon :icon="['fab', 'instagram']" class="me-2" />
              </ClientOnly>
            </a>
            <a target="_blank" class="text-dark" href="https://discord.gg/6DR43sZ27V" title="discord">
              <ClientOnly>
                <font-awesome-icon :icon="['fab', 'discord']" class="me-2" />
              </ClientOnly>
            </a>
            <nuxt-link to="/info" class="navbar-brand">
              <ClientOnly>
                <font-awesome-icon :icon="['fas', 'circle-info']" class="me-2"/>
              </ClientOnly>
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>