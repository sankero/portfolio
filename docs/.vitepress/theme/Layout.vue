<template>
  <h1>taga</h1>
  <!-- works -->
  <ul>
    <li v-for="post in $site.customData.workList" :key="post.href">
      <a :href="post.href">
        <h3>{{post.data.title}}</h3>
        <span>{{post.data.category}}</span>
        <time>{{post.data.date}}</time>
      </a>
    </li>
  </ul>
  <Content />
</template>


