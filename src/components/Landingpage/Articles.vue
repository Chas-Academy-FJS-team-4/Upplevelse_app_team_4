<script setup>
import heroImg from "../../assets/images/hero.jpg";
</script>
<template>
  <section class="pb-50 lg:px-25">
    <h2 class="mb-10 px-3">Vill du åka snabbt, långt eller både och?</h2>

    <article class="flex flex-col lg:flex-row gap-5 lg:gap-15 mb-30 mx-15">
      <img
        :src="heroImg"
        alt=""
        class="lg:w-1/2 object-cover rounded-lg mb-2"
      />
      <div class="flex flex-col justify-center gap-5 lg:w-1/2">
        <h3>Portal Maze of the Infinite Forest</h3>
        <p>
          Spring genom en oändlig skog där portaler förflyttar dig slumpmässigt
          mellan dimensioner. Lorem ipsum dolor sit amet consectetur adipisicing
          elit. Tempore repudiandae voluptates tenetur molestiae voluptatibus
          cumque. Culpa deleniti harum tenetur. Consectetur aut quia doloremque
          deleniti voluptates placeat, accusantium quasi aperiam reiciendis!
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo eum
          quam et nihil commodi fugit eos officia consequuntur natus, suscipit
          molestias aliquam quasi enim nisi accusamus ut culpa reiciendis
          deleniti?
        </p>
        <div class="flex justify-end">
          <button
            class="bg-purple-800 text-white px-6 py-2 rounded-md hover:bg-purple-700"
          >
            Boka nu
          </button>
        </div>
      </div>
    </article>

    <article class="flex flex-col md:flex-row mx-15 lg:gap-15">
      <div class="flex flex-col justify-center gap-5 lg:w-1/2">
        <img
          :src="heroImg"
          alt=""
          class="object-cover rounded-lg mb-2 flex lg:hidden"
        />
        <h3>Portal Maze of the Infinite Forest</h3>
        <p>
          Spring genom en oändlig skog där portaler förflyttar dig slumpmässigt
          mellan dimensioner. Lorem ipsum dolor sit amet consectetur adipisicing
          elit. Tempore repudiandae voluptates tenetur molestiae voluptatibus
          cumque. Culpa deleniti harum tenetur. Consectetur aut quia doloremque
          deleniti voluptates placeat, accusantium quasi aperiam reiciendis!
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo eum
          quam et nihil commodi fugit eos officia consequuntur natus, suscipit
          molestias aliquam quasi enim nisi accusamus ut culpa reiciendis
          deleniti?
        </p>
        <div class="flex justify-start">
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
  </section>
</template>
