<template>
  <i-container class="container _margin-x-0" fluid>
    <i-row top-xs class="_padding-1">
      <i-column xs="8">
        <h1 class="_font-weight-bold">Keep up</h1>
        <div
          class="_border _border-color-gray-70 _background-gray-20 _rounded _display-flex _justify-content-space-between _padding-1 _padding-y-2"
        >
          <i-card class="_margin-x-1">
            <img
              slot="image"
              src="../../assets/defUser.png"
              alt="Card Image"
              class="_width-25 _margin-left-2 _margin-y-2"
            />
            <h4 class="title">Card Title</h4>
            <p class="subtitle">Card Subtitle</p>
            <p>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </p>
            <a class="link" href="https://inkline.io">Example Link</a>
          </i-card>

          <i-card class="_margin-x-1">
            <img
              slot="image"
              src="../../assets/defUser.png"
              alt="Card Image"
              class="_width-25 _margin-left-2 _margin-y-2"
            />
            <h4 class="title">Card Title</h4>
            <p class="subtitle">Card Subtitle</p>
            <p>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </p>
            <a class="link" href="https://inkline.io">Example Link</a>
          </i-card>

          <i-card class="_margin-x-1">
            <img
              slot="image"
              src="../../assets/defUser.png"
              alt="Card Image"
              class="_width-25 _margin-left-2 _margin-y-2"
            />
            <h4 class="title">Card Title</h4>
            <p class="subtitle">Card Subtitle</p>
            <p>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </p>
            <a class="link" href="https://inkline.io">Example Link</a>
          </i-card>
        </div>
      </i-column>
      <i-column xs="4">
        <i-tooltip variant="dark" v-model="visible" placement="left">
          <h1 class="_font-weight-bold" @mouseenter="visible = true;" @mouseleave="visible = false;">Contribute</h1>
          <template slot="body">Tooltip</template>
        </i-tooltip>
        <div
          class="_position-static _border _border-color-gray-70 _background-gray-20 _rounded _padding-1 _display-flex _flex-direction-row _align-items-stretch"
        >
          Here a tutorial form with lecture, name, class size
        </div>
      </i-column>
    </i-row>
    <i-row top-xs class="_padding-1">
      <i-column xs="12">
        <h1 class="_font-weight-bold">Explore</h1>
        <div
          class="_border _border-color-gray-70 _background-gray-20 _rounded _display-flex _justify-content-space-between _padding-1 _padding-y-2"
        >
          <i-container>
            <i-row>
              <i-column xs="3">
                <i-card class="_margin-x-1 _margin-bottom-2">
                  <img
                    slot="image"
                    src="../../assets/administrate.png"
                    alt="Card Image"
                  />
                  <h4 class="title">Card Title</h4>
                  <p class="subtitle">Card Subtitle</p>
                  <p>
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </p>
                  <a class="link" href="https://inkline.io">Example Link</a>
                </i-card>
              </i-column>
              <i-column xs="3">
                <i-card class="_margin-x-1">
                  <img
                    slot="image"
                    src="../../assets/administrate.png"
                    alt="Card Image"
                  />
                  <h4 class="title">Card Title</h4>
                  <p class="subtitle">Card Subtitle</p>
                  <p>
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </p>
                  <a class="link" href="https://inkline.io">Example Link</a>
                </i-card>
              </i-column>
              <i-column xs="3">
                <i-card class="_margin-x-1">
                  <img
                    slot="image"
                    src="../../assets/administrate.png"
                    alt="Card Image"
                  />
                  <h4 class="title">Card Title</h4>
                  <p class="subtitle">Card Subtitle</p>
                  <p>
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </p>
                  <a class="link" href="https://inkline.io">Example Link</a>
                </i-card>
              </i-column>
              <i-column xs="3">
                <i-card class="_margin-x-1">
                  <img
                    slot="image"
                    src="../../assets/administrate.png"
                    alt="Card Image"
                  />
                  <h4 class="title">Card Title</h4>
                  <p class="subtitle">Card Subtitle</p>
                  <p>
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </p>
                  <a class="link" href="https://inkline.io">Example Link</a>
                </i-card>
              </i-column>
            </i-row>
            <i-row>
              <i-column xs="3">
                <i-card class="_margin-x-1 _margin-bottom-2">
                  <img
                    slot="image"
                    src="../../assets/administrate.png"
                    alt="Card Image"
                  />
                  <h4 class="title">Card Title</h4>
                  <p class="subtitle">Card Subtitle</p>
                  <p>
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </p>
                  <a class="link" href="https://inkline.io">Example Link</a>
                </i-card>
              </i-column>
              <i-column xs="3">
                <i-card class="_margin-x-1">
                  <img
                    slot="image"
                    src="../../assets/administrate.png"
                    alt="Card Image"
                  />
                  <h4 class="title">Card Title</h4>
                  <p class="subtitle">Card Subtitle</p>
                  <p>
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </p>
                  <a class="link" href="https://inkline.io">Example Link</a>
                </i-card>
              </i-column>
              <i-column xs="3">
                <i-card class="_margin-x-1">
                  <img
                    slot="image"
                    src="../../assets/administrate.png"
                    alt="Card Image"
                  />
                  <h4 class="title">Card Title</h4>
                  <p class="subtitle">Card Subtitle</p>
                  <p>
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </p>
                  <a class="link" href="https://inkline.io">Example Link</a>
                </i-card>
              </i-column>
              <i-column xs="3">
                <i-card class="_margin-x-1">
                  <img
                    slot="image"
                    src="../../assets/administrate.png"
                    alt="Card Image"
                  />
                  <h4 class="title">Card Title</h4>
                  <p class="subtitle">Card Subtitle</p>
                  <p>
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </p>
                  <a class="link" href="https://inkline.io">Example Link</a>
                </i-card>
              </i-column>
            </i-row>
            <i-row>
              <i-column xs="3">
                <i-card class="_margin-x-1">
                  <img
                    slot="image"
                    src="../../assets/administrate.png"
                    alt="Card Image"
                  />
                  <h4 class="title">Card Title</h4>
                  <p class="subtitle">Card Subtitle</p>
                  <p>
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </p>
                  <a class="link" href="https://inkline.io">Example Link</a>
                </i-card>
              </i-column>
              <i-column xs="3">
                <i-card class="_margin-x-1">
                  <img
                    slot="image"
                    src="../../assets/administrate.png"
                    alt="Card Image"
                  />
                  <h4 class="title">Card Title</h4>
                  <p class="subtitle">Card Subtitle</p>
                  <p>
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </p>
                  <a class="link" href="https://inkline.io">Example Link</a>
                </i-card>
              </i-column>
              <i-column xs="3">
                <i-card class="_margin-x-1">
                  <img
                    slot="image"
                    src="../../assets/administrate.png"
                    alt="Card Image"
                  />
                  <h4 class="title">Card Title</h4>
                  <p class="subtitle">Card Subtitle</p>
                  <p>
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </p>
                  <a class="link" href="https://inkline.io">Example Link</a>
                </i-card>
              </i-column>
              <i-column xs="3">
                <i-card class="_margin-x-1">
                  <img
                    slot="image"
                    src="../../assets/administrate.png"
                    alt="Card Image"
                  />
                  <h4 class="title">Card Title</h4>
                  <p class="subtitle">Card Subtitle</p>
                  <p>
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </p>
                  <a class="link" href="https://inkline.io">Example Link</a>
                </i-card>
              </i-column>
            </i-row>
          </i-container>
        </div>
      </i-column>
    </i-row>
  </i-container>
</template>

<style lang="scss">
.container {
  $container-width-xl: 100%;
  $container-width-lg: 100%;
  $container-width-md: 100%;
  $container-width-sm: 100%;
  $container-width-xs: 100%;
}
</style>

<script>

export default({
  data() {
    return {
    visible: true
    }
  },
})
</script>
