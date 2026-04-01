<script lang="ts">
  type Link = {
    target: string;
    title: string;
  };

  type FurtherReadingProps = {
    links: Link[];
  };

  let { links }: FurtherReadingProps = $props();
</script>

<h2>Further Reading</h2>

<ul>
  {#each links as link}
    <li><a href={link.target}>{link.title}</a></li>
  {/each}
</ul>
