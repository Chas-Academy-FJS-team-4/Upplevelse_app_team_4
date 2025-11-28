<script setup>
import { ref } from "vue";
import experiencesData from "../../utils/experiences.json";
import heroImg from "../../assets/images/hero.jpg";

const newExperiences = ref(experiencesData.newExperiences);
</script>
<template>
  <section class="pb-50 lg:px-0">
    <h2 class="lg:mx-[90px] mx-[40px] mb-10">Nya spännande upplevelser</h2>

    <div class="flex flex-col">
      <article
        class="flex flex-col lg:flex-row gap-5 lg:gap-15 mb-30 lg:pt-0 mx-10 lg:mx-[90px]"
      >
        <img
          :src="heroImg"
          alt=""
          class="lg:w-1/2 object-cover rounded-lg mb-2"
        />
        <div class="flex flex-col justify-center gap-5 lg:w-1/2">
          <h3>{{ newExperiences[0].title }}</h3>
          <p>
            {{ newExperiences[0].longDescription }}
          </p>
          <div class="flex justify-between mt-5 lg:m-0">
            <div class="text-orange-500">
              <p class="flex items-center gap-2">
                <span>
                  <svg
                    width="20px"
                    height="20px"
                    viewBox="-4 0 32 32"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    xmlns:sketch="http://www.bohemiancoding.com/sketch/ns"
                    fill="#000"
                  >
                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      <title>location</title>
                      <desc>Created with Sketch Beta.</desc>
                      <defs></defs>
                      <g
                        id="Page-1"
                        stroke="none"
                        stroke-width="1"
                        fill="none"
                        fill-rule="evenodd"
                        sketch:type="MSPage"
                      >
                        <g
                          id="Icon-Set"
                          sketch:type="MSLayerGroup"
                          transform="translate(-104.000000, -411.000000)"
                          fill="#ff9900"
                        >
                          <path
                            d="M116,426 C114.343,426 113,424.657 113,423 C113,421.343 114.343,420 116,420 C117.657,420 119,421.343 119,423 C119,424.657 117.657,426 116,426 L116,426 Z M116,418 C113.239,418 111,420.238 111,423 C111,425.762 113.239,428 116,428 C118.761,428 121,425.762 121,423 C121,420.238 118.761,418 116,418 L116,418 Z M116,440 C114.337,440.009 106,427.181 106,423 C106,417.478 110.477,413 116,413 C121.523,413 126,417.478 126,423 C126,427.125 117.637,440.009 116,440 L116,440 Z M116,411 C109.373,411 104,416.373 104,423 C104,428.018 114.005,443.011 116,443 C117.964,443.011 128,427.95 128,423 C128,416.373 122.627,411 116,411 L116,411 Z"
                            id="location"
                            sketch:type="MSShapeGroup"
                          ></path>
                        </g>
                      </g>
                    </g>
                  </svg>
                </span>

                {{ newExperiences[0].location }}
              </p>
              <p class="flex items-center gap-2">
                <span class="">
                  <svg
                    width="20px"
                    height="20px"
                    viewBox="0 0 64 64"
                    xmlns="http://www.w3.org/2000/svg"
                    stroke-width="3"
                    stroke="#ff9900"
                    fill="none"
                  >
                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      <circle cx="32" cy="18.14" r="11.14"></circle>
                      <path
                        d="M54.55,56.85A22.55,22.55,0,0,0,32,34.3h0A22.55,22.55,0,0,0,9.45,56.85Z"
                      ></path>
                    </g></svg
                ></span>
                {{ newExperiences[0].ageGroup }}
              </p>
            </div>
            <button
              class="bg-purple-800 text-white px-6 py-2 rounded-md hover:bg-purple-700"
            >
              Boka nu
            </button>
          </div>
        </div>
      </article>

      <!-- <article class="flex flex-col lg:flex-row gap-5 lg:gap-15 mb-30 lg:pt-0"> -->

      <article class="flex flex-col md:flex-row lg:gap-15 mx-10 lg:mx-[90px]">
        <div class="flex flex-col justify-center gap-5 lg:w-1/2">
          <img
            :src="heroImg"
            alt=""
            class="object-cover rounded-lg mb-2 flex lg:hidden"
          />
          <h3>{{ newExperiences[1].title }}</h3>
          <p>
            {{ newExperiences[1].longDescription }}
          </p>
          <div class="flex justify-between mt-5 lg:m-0">
            <div class="text-orange-500">
              <p class="flex items-center gap-2">
                <span>
                  <svg
                    width="20px"
                    height="20px"
                    viewBox="-4 0 32 32"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    xmlns:sketch="http://www.bohemiancoding.com/sketch/ns"
                    fill="#000"
                  >
                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      <title>location</title>
                      <desc>Created with Sketch Beta.</desc>
                      <defs></defs>
                      <g
                        id="Page-1"
                        stroke="none"
                        stroke-width="1"
                        fill="none"
                        fill-rule="evenodd"
                        sketch:type="MSPage"
                      >
                        <g
                          id="Icon-Set"
                          sketch:type="MSLayerGroup"
                          transform="translate(-104.000000, -411.000000)"
                          fill="#ff9900"
                        >
                          <path
                            d="M116,426 C114.343,426 113,424.657 113,423 C113,421.343 114.343,420 116,420 C117.657,420 119,421.343 119,423 C119,424.657 117.657,426 116,426 L116,426 Z M116,418 C113.239,418 111,420.238 111,423 C111,425.762 113.239,428 116,428 C118.761,428 121,425.762 121,423 C121,420.238 118.761,418 116,418 L116,418 Z M116,440 C114.337,440.009 106,427.181 106,423 C106,417.478 110.477,413 116,413 C121.523,413 126,417.478 126,423 C126,427.125 117.637,440.009 116,440 L116,440 Z M116,411 C109.373,411 104,416.373 104,423 C104,428.018 114.005,443.011 116,443 C117.964,443.011 128,427.95 128,423 C128,416.373 122.627,411 116,411 L116,411 Z"
                            id="location"
                            sketch:type="MSShapeGroup"
                          ></path>
                        </g>
                      </g>
                    </g>
                  </svg>
                </span>

                {{ newExperiences[0].location }}
              </p>
              <p class="flex items-center gap-2">
                <span class="">
                  <svg
                    width="20px"
                    height="20px"
                    viewBox="0 0 64 64"
                    xmlns="http://www.w3.org/2000/svg"
                    stroke-width="3"
                    stroke="#ff9900"
                    fill="none"
                  >
                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      <circle cx="32" cy="18.14" r="11.14"></circle>
                      <path
                        d="M54.55,56.85A22.55,22.55,0,0,0,32,34.3h0A22.55,22.55,0,0,0,9.45,56.85Z"
                      ></path>
                    </g></svg
                ></span>
                {{ newExperiences[0].ageGroup }}
              </p>
            </div>
            <button
              class="bg-purple-800 text-white px-6 py-2 rounded-md hover:bg-purple-700"
            >
              Boka nu
            </button>
          </div>
        </div>
        <img
          :src="heroImg"
          alt=""
          class="w-1/2 object-cover rounded-lg mb-2 hidden lg:flex"
        />
      </article>
    </div>
  </section>
</template>
