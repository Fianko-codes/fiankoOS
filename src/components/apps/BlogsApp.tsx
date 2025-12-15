import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  Search,
  FileText,
  ChevronRight,
  Maximize2,
  X,
  Globe
} from 'lucide-react';
import { Post } from '../../data/posts';
import { fetchRSS } from '@/lib/rss';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';

export const BlogsApp = () => {
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [rssPosts, setRssPosts] = useState<Post[]>([]);

  useEffect(() => {
    fetchRSS('https://blog.anubhavprasai.com.np/rss.xml').then(posts => {
      if (posts.length > 0) {
        setRssPosts(posts);
      }
    });
  }, []);

  const allPosts = rssPosts;

  const filteredPosts = allPosts.filter(post =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="h-full bg-ctp-base overflow-hidden flex flex-col font-sans">
      <AnimatePresence mode="wait">
        {selectedPost ? (
          <BlogPostView
            key="post-view"
            post={selectedPost}
            onBack={() => setSelectedPost(null)}
          />
        ) : (
          <BlogFileSystemView
            key="file-view"
            posts={filteredPosts}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            onSelectPost={setSelectedPost}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

interface BlogFileSystemViewProps {
  posts: Post[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onSelectPost: (post: Post) => void;
}

const BlogFileSystemView = ({ posts, searchQuery, setSearchQuery, onSelectPost }: BlogFileSystemViewProps) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  // Clear selection when clicking empty space
  const handleBackgroundClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setSelectedId(null);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="h-full flex flex-col"
      onClick={handleBackgroundClick}
    >
      {/* Search Bar / Address Bar */}
      <div className="flex-none p-4 border-b border-ctp-surface0 bg-ctp-mantle/50 backdrop-blur-sm shadow-sm z-10" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center gap-4">
          <div className="flex gap-2 text-ctp-subtext0">
            <ArrowLeft className="w-5 h-5 opacity-50 cursor-not-allowed" />
            <ChevronRight className="w-5 h-5 opacity-50" />
            <span className="font-semibold text-ctp-text">Start</span>
          </div>
          <div className="flex-1 max-w-xl mx-auto relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ctp-subtext0 group-focus-within:text-ctp-blue transition-colors" />
            <input
              type="text"
              placeholder="Search in Blog..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-ctp-surface0/50 hover:bg-ctp-surface0 border border-ctp-surface1 rounded-md py-1.5 pl-9 pr-4 
                       text-sm text-ctp-text placeholder:text-ctp-subtext0 focus:outline-none focus:ring-1 focus:ring-ctp-blue focus:bg-ctp-surface0 transition-all"
            />
          </div>
          <div className="w-20" /> {/* Spacer */}
        </div>
      </div>

      {/* File Grid */}
      <ScrollArea className="flex-1 p-6" onClick={handleBackgroundClick}>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4" onClick={handleBackgroundClick}>

          {posts.map((post, index) => {
            const isSelected = selectedId === post.id;
            return (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedId(post.id);
                }}
                onDoubleClick={(e) => {
                  e.stopPropagation();
                  onSelectPost(post);
                }}
                className={`group flex flex-col items-center p-3 rounded-lg cursor-pointer transition-colors border border-transparent
                           ${isSelected ? 'bg-ctp-surface1/80 border-ctp-surface2' : 'hover:bg-ctp-surface1/50 hover:border-ctp-surface2/50'}`}
              >
                <div className="relative mb-2 transition-transform group-hover:scale-105 duration-200">
                  <FileText className="w-16 h-16 text-ctp-blue drop-shadow-md" strokeWidth={1.5} />
                  <div className="absolute bottom-2 right-0 bg-ctp-base rounded px-1 py-0.5 text-[10px] font-bold text-ctp-text border border-ctp-surface1 shadow-sm">
                    BLOG
                  </div>
                </div>

                <div className="text-center w-full relative">
                  <p className={`text-sm font-medium text-ctp-text w-full px-1 ${isSelected ? 'break-words' : 'truncate'}`}>
                    {post.slug}.blog
                  </p>
                  <p className="text-[10px] text-ctp-subtext0 mt-0.5">
                    {new Date(post.publishDate).toLocaleDateString()}
                  </p>
                </div>
              </motion.div>
            );
          })}

          {posts.length === 0 && (
            <div className="col-span-full flex flex-col items-center justify-center py-20 text-ctp-overlay0">
              <div className="w-16 h-16 border-2 border-dashed border-ctp-surface2 rounded-xl flex items-center justify-center mb-4">
                <Search className="w-8 h-8" />
              </div>
              <p>No items match your search.</p>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Status Bar */}
      <div className="flex-none px-4 py-1 bg-ctp-mantle border-t border-ctp-surface0 text-xs text-ctp-subtext0 flex items-center justify-between select-none">
        <div className="flex items-center gap-4">
          <span>{posts.length} item{posts.length !== 1 ? 's' : ''}</span>
          <div className="h-3 w-[1px] bg-ctp-surface1" />
          <button
            onClick={() => window.open('https://blog.anubhavprasai.com.np', '_blank')}
            className="flex items-center gap-1.5 hover:text-ctp-blue transition-colors cursor-pointer group"
          >
            <Globe className="w-3 h-3 group-hover:scale-110 transition-transform" />
            <span>view blog website</span>
          </button>
        </div>
        <span>Free Space: 12GB</span>
      </div>
    </motion.div>
  );
};

interface BlogPostViewProps {
  post: Post;
  onBack: () => void;
}

const BlogPostView = ({ post, onBack }: BlogPostViewProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      className="h-full flex flex-col bg-white text-gray-900 overflow-hidden shadow-2xl m-2 rounded-lg border border-gray-200"
    >
      {/* Window Title Bar */}
      {/* Window Title Bar */}
      <div className="flex-none h-12 bg-gray-100 border-b border-gray-200 flex items-center justify-between px-3 select-none">
        <div className="flex items-center gap-2">
          <FileText className="w-5 h-5 text-blue-500" />
          <span className="text-sm font-medium text-gray-700">{post.slug}.blog - Notepad</span>
        </div>
        <div className="flex items-center gap-1">
          {/* Minimize Button REMOVED */}
          <Button variant="ghost" size="icon" className="h-10 w-10 hover:bg-gray-200 rounded">
            <Maximize2 className="w-5 h-5 text-gray-500" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-10 w-10 bg-red-500 text-white hover:bg-red-600 rounded transition-colors"
            onClick={onBack}
          >
            <X className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Menu Bar */}
      <div className="flex-none px-2 py-1 bg-white border-b border-gray-100 flex gap-2 text-xs text-gray-600 select-none">
        <span className="hover:bg-blue-50 px-2 py-0.5 rounded cursor-pointer">File</span>
        <span className="hover:bg-blue-50 px-2 py-0.5 rounded cursor-pointer">Edit</span>
        <span className="hover:bg-blue-50 px-2 py-0.5 rounded cursor-pointer">Format</span>
        <span className="hover:bg-blue-50 px-2 py-0.5 rounded cursor-pointer">View</span>
        <span className="hover:bg-blue-50 px-2 py-0.5 rounded cursor-pointer">Help</span>
      </div>

      {/* Content */}
      <ScrollArea className="flex-1 bg-white cursor-text font-mono">
        <div className="p-8 max-w-4xl mx-auto">
          <div className="mb-8 pb-4 border-b-2 border-gray-100">
            <h1 className="text-3xl font-bold mb-2 text-gray-900">{post.title}</h1>
            <p className="text-gray-500 text-sm">
              Date: {new Date(post.publishDate).toLocaleDateString()} |
              Category: {post.category.toUpperCase()} |
              Tags: {post.tags.join(', ')}
            </p>
          </div>

          <article className="prose prose-gray max-w-none text-gray-800 leading-relaxed">
            <div className="whitespace-pre-wrap font-mono text-base" dangerouslySetInnerHTML={{ __html: post.content }} />
          </article>
        </div>
      </ScrollArea>

      {/* Footer */}
      <div className="flex-none px-3 py-1 bg-gray-50 border-t border-gray-200 text-[10px] text-gray-400 flex justify-end gap-4 select-none">
        <span>Ln 1, Col 1</span>
        <span>100%</span>
        <span>UTF-8</span>
        <span>{post.readingTime} min read</span>
      </div>
    </motion.div>
  );
};
