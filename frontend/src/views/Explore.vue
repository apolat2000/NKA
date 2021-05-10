<template>
  <i-container class="container _margin-x-0" fluid>
    <i-row top-xs class="_padding-1">
      <i-column xs="12">
        <h1 class="_font-weight-bold">Recommended tutorials</h1>
        <div
          class="_border _border-color-gray-70 _rounded _padding-1 _padding-y-1"
        >
          <div
            class="_display-flex _justify-content-space-between _align-content-stretch"
          >
            <i-card style="width: 320px" class="_margin-right-1">
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
                        style="color: green; font-size: 30px"
                        >•</span
                      >
                    </h5>
                    <p class="_margin-0">A.f.I.</p>
                  </div>
                  <img
                    slot="image"
                    src="../assets/defUser.png"
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
                  >
                    <i-icon icon="chevron-right" />
                  </i-button>
                </div>
              </template>
            </i-card>
            <i-card style="width: 320px" class="_margin-right-1">
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
                        style="color: green; font-size: 30px"
                        >•</span
                      >
                    </h5>
                    <p class="_margin-0">A.f.I.</p>
                  </div>
                  <img
                    slot="image"
                    src="../assets/defUser.png"
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
                        style="color: green; font-size: 30px"
                        >•</span
                      >
                    </h5>
                    <p class="_margin-0">A.f.I.</p>
                  </div>
                  <img
                    slot="image"
                    src="../assets/defUser.png"
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
    </i-row>
  </i-container>
</template>

