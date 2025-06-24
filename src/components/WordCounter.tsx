
import React, { useState, useMemo } from 'react';
import { Copy, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import WordCounterCard from './WordCounterCard';
import { useToast } from '@/hooks/use-toast';

const WordCounter = () => {
  const [text, setText] = useState('');
  const { toast } = useToast();

  const stats = useMemo(() => {
    if (!text.trim()) {
      return {
        words: 0,
        characters: 0,
        charactersNoSpaces: 0,
        sentences: 0,
        paragraphs: 0,
        readingTime: 0,
        speakingTime: 0,
        keywordDensity: {}
      };
    }

    // Word count
    const words = text.trim().split(/\s+/).filter(word => word.length > 0);
    const wordCount = words.length;

    // Character count
    const characterCount = text.length;
    const characterCountNoSpaces = text.replace(/\s/g, '').length;

    // Sentence count
    const sentenceCount = text.split(/[.!?]+/).filter(sentence => sentence.trim().length > 0).length;

    // Paragraph count
    const paragraphCount = text.split(/\n\s*\n/).filter(paragraph => paragraph.trim().length > 0).length;

    // Reading time (average 200 words per minute)
    const readingTime = Math.ceil(wordCount / 200);

    // Speaking time (average 150 words per minute)
    const speakingTime = Math.ceil(wordCount / 150);

    // Keyword density (top 5 most frequent words, excluding common words)
    const commonWords = new Set(['the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by', 'is', 'are', 'was', 'were', 'be', 'been', 'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could', 'should', 'may', 'might', 'must', 'can', 'this', 'that', 'these', 'those', 'i', 'you', 'he', 'she', 'it', 'we', 'they', 'me', 'him', 'her', 'us', 'them']);
    
    const wordFrequency: { [key: string]: number } = {};
    words.forEach(word => {
      const cleanWord = word.toLowerCase().replace(/[^\w]/g, '');
      if (cleanWord && !commonWords.has(cleanWord) && cleanWord.length > 2) {
        wordFrequency[cleanWord] = (wordFrequency[cleanWord] || 0) + 1;
      }
    });

    const keywordDensity = Object.entries(wordFrequency)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5)
      .reduce((acc, [word, count]) => {
        acc[word] = Math.round((count / wordCount) * 100 * 10) / 10;
        return acc;
      }, {} as { [key: string]: number });

    return {
      words: wordCount,
      characters: characterCount,
      charactersNoSpaces: characterCountNoSpaces,
      sentences: sentenceCount,
      paragraphs: paragraphCount,
      readingTime,
      speakingTime,
      keywordDensity
    };
  }, [text]);

  const handleReset = () => {
    setText('');
    toast({
      title: "Text cleared",
      description: "The word counter has been reset.",
    });
  };

  const handleCopyStats = async () => {
    const statsText = `Words: ${stats.words}
Characters: ${stats.characters}
Characters (no spaces): ${stats.charactersNoSpaces}
Sentences: ${stats.sentences}
Paragraphs: ${stats.paragraphs}
Reading time: ${stats.readingTime} min
Speaking time: ${stats.speakingTime} min`;

    try {
      await navigator.clipboard.writeText(statsText);
      toast({
        title: "Statistics copied",
        description: "Word count statistics copied to clipboard.",
      });
    } catch (err) {
      toast({
        title: "Copy failed",
        description: "Unable to copy statistics to clipboard.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      {/* Input Section */}
      <div className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 p-6">
        <div className="mb-4">
          <h2 className="text-2xl font-bold text-white mb-2">Enter Your Text</h2>
          <p className="text-gray-300">Paste or type your text below to analyze it</p>
        </div>
        
        <Textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Start typing or paste your text here..."
          className="min-h-[200px] bg-white/5 border-white/20 text-white placeholder:text-gray-400 resize-none"
        />
        
        <div className="flex gap-3 mt-4">
          <Button
            onClick={handleCopyStats}
            variant="secondary"
            className="bg-white/10 hover:bg-white/20 border-white/20"
            disabled={!text.trim()}
          >
            <Copy className="w-4 h-4 mr-2" />
            Copy Stats
          </Button>
          <Button
            onClick={handleReset}
            variant="outline"
            className="bg-transparent hover:bg-white/10 border-white/20 text-white"
            disabled={!text.trim()}
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      {text.trim() && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
          <WordCounterCard
            title="Words"
            value={stats.words}
            color="from-blue-500 to-purple-600"
          />
          <WordCounterCard
            title="Characters"
            value={stats.characters}
            color="from-green-500 to-teal-600"
          />
          <WordCounterCard
            title="Characters (no spaces)"
            value={stats.charactersNoSpaces}
            color="from-orange-500 to-yellow-600"
          />
          <WordCounterCard
            title="Sentences"
            value={stats.sentences}
            color="from-red-500 to-pink-600"
          />
          <WordCounterCard
            title="Paragraphs"
            value={stats.paragraphs}
            color="from-purple-500 to-indigo-600"
          />
          <WordCounterCard
            title="Reading Time"
            value={`${stats.readingTime} min`}
            color="from-cyan-500 to-blue-600"
          />
          <WordCounterCard
            title="Speaking Time"
            value={`${stats.speakingTime} min`}
            color="from-emerald-500 to-green-600"
          />
          
          {/* Keyword Density Card */}
          {Object.keys(stats.keywordDensity).length > 0 && (
            <div className="md:col-span-2 lg:col-span-3">
              <div className="bg-gradient-to-r from-violet-500 to-purple-600 rounded-xl p-6 text-white">
                <h3 className="text-lg font-semibold mb-4">Top Keywords</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                  {Object.entries(stats.keywordDensity).map(([word, density]) => (
                    <div key={word} className="bg-white/20 rounded-lg p-3 text-center">
                      <div className="font-medium capitalize">{word}</div>
                      <div className="text-sm opacity-80">{density}%</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Empty State */}
      {!text.trim() && (
        <div className="text-center py-12">
          <div className="text-gray-400 text-lg mb-2">Start typing to see your word count statistics</div>
          <div className="text-gray-500 text-sm">All statistics will update in real-time as you type</div>
        </div>
      )}
    </div>
  );
};

export default WordCounter;
