<script lang="ts">
    import type {DoubleEliminationTree} from "$lib/model/tournamentTree.model";
    import DoubleEliminationTournamentTree
        from "$components/tournament_overview/DoubleEliminationTournamentTree.svelte";
    import {TournamentNode} from "$lib/model/tournamentTree.model";

    let t: DoubleEliminationTree = {
        finale: new TournamentNode(),
        upper: {
            node: new TournamentNode(),
            left: {
                node: new TournamentNode(),
                left: new TournamentNode(),
                right: new TournamentNode()
            },
            right: {
                node: new TournamentNode(),
                left: new TournamentNode(),
                right: new TournamentNode()
            }
        },
        lower: {
            node: new TournamentNode(),
            child: {
                node: new TournamentNode(),
                left: {
                    node: new TournamentNode(),
                    child: new TournamentNode()
                },
                right: {
                    node: new TournamentNode(),
                    child: new TournamentNode()
                }
            }
        },
        level: 2
    }
</script>

<div>
    <DoubleEliminationTournamentTree tree={t}/>
</div>
