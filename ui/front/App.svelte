<script>
	import last from 'lodash/last';

	let pullRequests;

	fetch('http://localhost:5001/list')
		.then(response => response.json())
		.then(result => pullRequests = result);

	$: {
		console.log(pullRequests)
	}
</script>

{#if pullRequests}
	<table class="table">
		{#each pullRequests as pullRequest}
			<tr>
				<td><a href={pullRequest.permalink} target="_blank">#{last(pullRequest.permalink.split('/'))}</a></td>
				<td>
					{#each pullRequest.reviews.nodes as review}
						✅
					{/each}
				</td>
				<td>{pullRequest.title}</td>
				<td><span class="specialSpan">{pullRequest.baseRefName} -> {pullRequest.headRefName}</span></td>
			</tr>
		{/each}
	</table>
{/if}

<style>
	.table {
		margin: 0 auto;
		font-size: 18px;
	}
	.specialSpan {
		display: inline-block;
		width: 300px;
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
	}
</style>
