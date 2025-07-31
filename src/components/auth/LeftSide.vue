<template>
  <div class="hidden lg:flex lg:w-1/2 p-8 flex-col justify-between bg-cover bg-center bg-no-repeat relative"
    style="background: url('/bg.png') no-repeat center center; background-size: cover;">
    <!-- Semi-transparent overlay for better text readability -->
    <div class="absolute inset-0 bg-blue-900 opacity-75 lg:block hidden"></div>

    <!-- Content positioned above the overlay -->
    <div class="relative z-10">
      <div class="mb-8 flex items-center">
        <!-- <img src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" class="h-10 w-auto mr-4"
          alt="MLL 360 ERP Logo"> -->
        <svg class="w-[28px] h-[28px] text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
          width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
          <path fill-rule="evenodd"
            d="M3 4a1 1 0 0 0-.822 1.57L6.632 12l-4.454 6.43A1 1 0 0 0 3 20h13.153a1 1 0 0 0 .822-.43l4.847-7a1 1 0 0 0 0-1.14l-4.847-7a1 1 0 0 0-.822-.43H3Z"
            clip-rule="evenodd" />
        </svg>
        <h2 class="text-2xl font-bold text-white ml-2">MLL 360 ERP</h2>
      </div>

      <div>&nbsp;</div>
      <div>&nbsp;</div>

      <div class="mt-32 flex items-center justify-start">
        <div class="w-3/4">
          <h1 class="text-2xl md:text-6xl font-bold mb-6 text-white leading-snug">Streamline Your Operations. Empower Your
            Workflow.</h1>
          <p class="text-gray-300 text-lg">Simplify complex logistics processes, automate routine tasks, and gain full
            visibility across departments.
            MLL360 ERP brings all your operational tools into one integrated platform, helping your team work smarter,
            faster, and more efficiently, from procurement and inventory to finance and human resources.
            Experience greater control, reduced delays, and improved decision-making, all powered by real-time data and
            intuitive workflows.</p>
        </div>
      </div>
    </div>

    <div class="absolute bottom-0 left-0 right-0 p-8 text-left text-white text-lg">
      &copy; 2025 MLL 360 ERP. All rights reserved.
    </div>
  </div>
</template>

<script>

</script>

<style scoped>
/* Additional styling if needed */
</style>