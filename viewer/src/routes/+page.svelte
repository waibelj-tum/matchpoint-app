<script lang="ts">
    import Match from "$lib/Match.svelte";

    let match1: Match = {
        player1: "Alison",
        player2: "Bob",
        result: [3, 1],
        sets: [[11, 5], [11, 7], [12, 14], [11, 9]]
    }
    let match2: Match = {
        player1: "Clara",
        player2: "David",
        result: [1, 1],
        sets: [[11, 5], [1, 11]]
    }

</script>


<table>
    <Match bind:match={match1}/>
    <Match bind:match={match2}/>
</table>


<style>
    table {
        border-collapse: collapse;
    }
</style>

