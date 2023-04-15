<script lang="ts">

    import Match from "$components/tournament_flow/Match.svelte";
    import MatchOverview from "$components/tournament_flow/MatchOverview.svelte";

    let match1: Match = {
        player1: "Alison",
        player2: "Bob",
        sets: []
    }
    let match2: Match = {
        player1: "Clara",
        player2: "David",
        sets: []
    }
</script>


<MatchOverview />



