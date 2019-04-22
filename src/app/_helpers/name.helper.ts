import {Lexicon} from "../_classes/Lexicon";

export class NameHelper {


    static generateLexicon() {
        const consonants = 'qwrtpsdfghsrtsjklzxcvbnm';
        const vowels = 'eyuioaoua';
        const suffixes = [
            {root: 'on', singular: 'onan', multiple: 'onans'},
            {root: 'on', singular: 'onan', multiple: 'onans'},
            {root: 'on', singular: 'onan', multiple: 'onans'},
            {root: 'on', singular: 'onan', multiple: 'onans'},
            {root: 'ia', singular: 'ian', multiple: 'ians'},
            {root: 'ia', singular: 'ian', multiple: 'ians'},
            {root: 'ia', singular: 'ian', multiple: 'ians'},
            {root: 'ia', singular: 'ian', multiple: 'ians'},
            {root: 'an', singular: 'an', multiple: 'ans'},
            {root: '', singular: 'an', multiple: 'ans'},
            {root: '', singular: 'an', multiple: 'ans'},
            {root: '', singular: 'an', multiple: 'ans'},
            {root: '', singular: 'an', multiple: 'ans'},
            {root: '', singular: 'an', multiple: 'ans'},
            {root: '', singular: 'an', multiple: 'ans'},
            {root: '', singular: 'ite', multiple: 'ites'},
            {root: '', singular: 'ite', multiple: 'ites'},
            {root: '', singular: 'ite', multiple: 'ites'},
            {root: 'um', singular: 'i', multiple: 'ii'},
            {root: 'um', singular: 'i', multiple: 'ii'},
            {root: 'um', singular: 'i', multiple: 'ii'},
            {root: 'as', singular: 'an', multiple: 'ans'},
            {root: 'os', singular: 'on', multiple: 'ons'},
            {root: 'is', singular: 'is', multiple: 'isians'},
            {root: '', singular: 'ic', multiple: 'ics'},
            {root: 'i', singular: 'ic', multiple: 'ics'},
            {root: 'u', singular: 'uic', multiple: 'uics'},
        ];

        let lexicon = new Lexicon();

        for (let x = 0; x < 10; x++) {
            lexicon.consonants.push(consonants[Math.floor(Math.random() * consonants.length)])
        }

        for (let x = 0; x < 3; x++) {
            lexicon.vowels.push(vowels[Math.floor(Math.random() * vowels.length)])
        }

        lexicon.suffix = suffixes[Math.floor(Math.random() * suffixes.length)];

        return lexicon;
    }

    static generateName(lexicon) {
        let name = '';
        let isLastLetterVowel = Math.random() > 0.5;
        let isBeforeLastLetterVowel = Math.random() > 0.5;
        for (let x = 0; x < Math.random() * 6 + 2; x++) {
            if ((Math.random() > 0.5 && !(isBeforeLastLetterVowel && isLastLetterVowel))
                || (!isBeforeLastLetterVowel && !isLastLetterVowel)) {
                isBeforeLastLetterVowel = isLastLetterVowel;
                isLastLetterVowel = true;
                name += lexicon.vowels[Math.floor(Math.random() * lexicon.vowels.length)]
            } else {
                isBeforeLastLetterVowel = isLastLetterVowel;
                isLastLetterVowel = false;
                name += lexicon.consonants[Math.floor(Math.random() * lexicon.consonants.length)]
            }
        }
        name = name[0].toUpperCase() + name.substring(1);
        return name;
    }
}