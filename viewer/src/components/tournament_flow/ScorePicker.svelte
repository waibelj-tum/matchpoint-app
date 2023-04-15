<script lang="ts">
    import {createEventDispatcher, onMount, tick} from "svelte";
    const pointsToWin = 11
    const leadByPoints = 2
    const dispatch = createEventDispatcher()

    export let score: [number, number] | null
    let presentation
    let textField
    let focusout = () => {
        selectScore()
        freeFocus()
    }

    const focusin = async () => {
        await tick()
        textField.select()
    }

    function freeFocus() {
        dispatch('freeFocus')
    }

    function focusNext() {
        focusout = () => {}
        dispatch('focusNext')
    }

    function selectScore() {
        const winningPoints = (losingPoints: number) => Math.max(losingPoints + leadByPoints, pointsToWin)
        function validInput(input: [number, number]): boolean {
            if(input.length > 2) {
                return false
            }
            if(input.length < 1){
                return false
            }
            if(input.some(points => isNaN(points))){
                return false
            }
            return !(input.length === 2 && input.some(points => points < 0));
        }

        let input = presentation.trim().split(":")
        let input_numbers = input.map(points => parseInt(points))

        if (validInput(input_numbers)) {
            if(input.length === 1) {
                if(input[0].includes('-')) {
                    score = [-input_numbers[0], winningPoints(-input_numbers[0])]
                } else {
                    score = [winningPoints(input_numbers[0]), input_numbers[0]]
                }
            } else {
                score = input
            }
        }
        resetText()
    }
    function resetText() {
        presentation =  score ? score[0] + ":" + score[1] : ":"
    }
    async function onKey(event) {
        switch(event.key) {
            case 'Escape':
                resetText()
                freeFocus()
                break
            case 'Tab':
                event.preventDefault()
                selectScore()
                focusNext()
                break
            case 'Enter':
                selectScore()
                freeFocus()
                break
        }
    }

    onMount(() => {
        resetText()
        textField.focus()
    })

</script>

<input
        bind:this={textField}
        bind:value={presentation}
        on:keydown={onKey}
        on:focusin={focusin}
        on:focusout={focusout}
/>

<style>
    input {
        border-style: solid;
        border-radius: 5px;
        border-width: 1px;
        border-color: lightgrey;
        width: 50px;
        text-align: center;
        padding: 4px;
        margin: 4px;
        font-size: 16px;
    }

    input:focus {
        border-width: 1px;
        border-color: black;
        outline-width: 0;
    }

</style>