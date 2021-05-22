<template>
  <i-container class="container _margin-x-0" fluid>
    <i-row top-xs class="_padding-1">
      <i-column xs="8">
        <h1 class="_font-weight-bold">Keep up</h1>
        <div
          class="_border _border-color-gray-70 _rounded _padding-1 _padding-y-1"
        >
          <div
            class="_display-flex _justify-content-space-between _align-content-stretch"
          >
            <i-card style="max-width: 75ch" class="_margin-right-1">
              <template slot="header">
                <div
                  class="_display-flex _justify-content-space-between _align-items-center"
                >
                  <div>
                    <h5
                      class="_margin-y-0 _a _text-truncate _font-weight-bold"
                      style="max-width: 150px"
                    >
                      Tutorial's Title<span
                        style="color: green; font-size: 2rem"
                        >•</span
                      >
                    </h5>
                    <p class="_margin-0">A.f.I.</p>
                  </div>
                  <img
                    slot="image"
                    src="../../assets/defUser.png"
                    alt="Card Image"
                    style="width: 35px"
                  />
                </div>
              </template>
              <p>
                If there is an announcement, last announcement. If not, if there
                is feed, last feed. If not, if there is a document, the
                document. If nothing, the description.
              </p>
              <template slot="footer">
                <div
                  class="_display-flex _justify-content-space-between _align-items-center"
                >
                  <div>
                    <p class="_margin-0">Next meeting:</p>
                    <p class="_margin-0">18/11/2000, 15:30.</p>
                  </div>
                  <i-button
                    outline
                    variant="primary"
                    circle
                    style="width: 35px; height: 35px"
                    ><i-icon icon="chevron-right"
                  /></i-button>
                </div>
              </template>
            </i-card>
            <i-card class="_margin-right-1">
              <template slot="header">
                <div
                  class="_display-flex _justify-content-space-between _align-items-center"
                >
                  <div>
                    <h5
                      class="_margin-y-0 _a _text-truncate _font-weight-bold"
                      style="max-width: 150px"
                    >
                      Tutorial's Title<span
                        style="color: green; font-size: 2rem"
                        >•</span
                      >
                    </h5>
                    <p class="_margin-0">A.f.I.</p>
                  </div>
                  <img
                    slot="image"
                    src="../../assets/defUser.png"
                    alt="Card Image"
                    style="width: 35px"
                  />
                </div>
              </template>
              If there is an announcement, last announcement. If not, if there
              is feed, last feed. If not, if there is a document, the document.
              If nothing, the description.
              <template slot="footer">
                <div
                  class="_display-flex _justify-content-space-between _align-items-center"
                >
                  <div>
                    <p class="_margin-0">Next meeting:</p>
                    <p class="_margin-0">18/11/2000, 15:30.</p>
                  </div>
                  <i-button
                    outline
                    variant="primary"
                    circle
                    style="width: 35px; height: 35px"
                    ><i-icon icon="chevron-right"
                  /></i-button>
                </div>
              </template>
            </i-card>
            <i-card>
              <template slot="header">
                <div
                  class="_display-flex _justify-content-space-between _align-items-center"
                >
                  <div>
                    <h5
                      class="_margin-y-0 _a _text-truncate _font-weight-bold"
                      style="max-width: 150px"
                    >
                      Tutorial's Title<span
                        style="color: green; font-size: 2rem"
                        >•</span
                      >
                    </h5>
                    <p class="_margin-0">A.f.I.</p>
                  </div>
                  <img
                    slot="image"
                    src="../../assets/defUser.png"
                    alt="Card Image"
                    style="width: 35px"
                  />
                </div>
              </template>
              If there is an announcement, last announcement. If not, if there
              is feed, last feed. If not, if there is a document, the document.
              If nothing, the description.
              <template slot="footer">
                <div
                  class="_display-flex _justify-content-space-between _align-items-center"
                >
                  <div>
                    <p class="_margin-0">Next meeting:</p>
                    <p class="_margin-0">18/11/2000, 15:30.</p>
                  </div>
                  <i-button
                    outline
                    variant="primary"
                    circle
                    style="width: 35px; height: 35px"
                    ><i-icon icon="chevron-right"
                  /></i-button>
                </div>
              </template>
            </i-card>
          </div>
          <div class="_clearfix">
            <i-button variant="primary" class="_float-right _margin-top-1"
              >see all >></i-button
            >
          </div>
        </div>
      </i-column>
      <i-column xs="4" class="_height-100">
        <h1 class="_font-weight-bold">Your tutorship</h1>
        <div
          class="_border _border-color-gray-70 _background-gray-10 _rounded _display-flex _flex-direction-column _align-items-center _padding-1"
        >
          <i-tabs class="_width-100">
            <i-tab title="My tutorial with a long name"> Tab 1 content </i-tab>
            <i-tab title="Tab 2"> Tab 2 content </i-tab>
            <i-tab title="more >>">
              <i-button variant="primary" class="_margin-top-1 _margin-right-1"
                >Create a new tutorial
              </i-button></i-tab
            >
          </i-tabs>
        </div>
      </i-column>
    </i-row>
    <i-row top-xs class="_padding-1">
      <i-column xs="12">
        <h1 class="_font-weight-bold">Explore</h1>
        <div
          class="_border _border-color-gray-70 _background-gray-20 _rounded _display-flex _justify-content-space-between _padding-1 _padding-y-2"
        >
          <i-container fluid>
            <i-row>
              <i-column xs="3">
                <i-card class="_margin-bottom-2">
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
                <i-card class="">
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
                <i-card class="">
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
                <i-card>
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
                <i-card class="_margin-bottom-2">
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
                <i-card>
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
                <i-card>
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
                <i-card>
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
                <i-card>
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
                <i-card>
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
                <i-card>
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
                <i-card>
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
            <div class="_clearfix">
              <i-button
                variant="primary"
                class="_float-right _margin-top-1 _margin-right-1"
                >see all >></i-button
              >
            </div>
          </i-container>
        </div>
      </i-column>
    </i-row>
    <i-row top-xs class="_padding-1">
      <i-column xs="12">
        <h1 class="_font-weight-bold">Contribute</h1>
        <div
          class="_position-static _border _border-color-gray-70 _background-gray-20 _rounded _padding-1 _display-flex _flex-direction-row _align-items-stretch"
        >
          Here a tutorial form with lecture, name, class size
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