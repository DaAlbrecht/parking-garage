<script>
	import '../app.css';
	import Header from './Header.svelte';
</script>
<div class={`flex flex-col h-full`}>
	<Header />
	<slot />	
</div>