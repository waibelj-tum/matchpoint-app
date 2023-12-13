<script lang="ts">
    import type {DoubleEliminationTree} from "$lib/model/tournamentTree.model";
    import DoubleEliminationTournamentTree
        from "$components/tournament_overview/DoubleEliminationTournamentTree.svelte";
    import {TournamentNode} from "$lib/model/tournamentTree.model";

    let t: DoubleEliminationTree = {
        finale: new TournamentNode(14, null, null),
        upper: {
            node: new TournamentNode(9,14,13 ),
            left: {
                node: new TournamentNode(5, 9, 11),
                left: new TournamentNode(1,5,7),
                right: new TournamentNode(2,5,7)
            },
            right: {
                node: new TournamentNode(6, 9, 10),
                left: new TournamentNode(3,6,8),
                right: new TournamentNode(4,6,8)
            }
        },
        lower: {
            node: new TournamentNode(13,14,null),
            child: {
                node: new TournamentNode(12,13,null),
                left: {
                    node: new TournamentNode(10,12,null),
                    child: new TournamentNode(7,10,null)
                },
                right: {
                    node: new TournamentNode(11,12,null),
                    child: new TournamentNode(8,11,null)
                }
            }
        },
        level: 2
    }
</script>

<div>
    <DoubleEliminationTournamentTree tree={t}/>
</div>

<style>
    :global(:root) {
        --tournament-border-color: #C0C0C0;
        --tournament-border-width: 1px;
        --tournament-border-style: solid;
        --tournament-node-width: 90px;
        --tournament-node-heigth: 39px;
    }
</style>
