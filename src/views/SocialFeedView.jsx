import { useState } from 'react';
import { Heart, MessageCircle, Share2, Plus, Send, MoreVertical, CheckCircle, MessageSquare } from 'lucide-react';
import { BigButton } from '../components/BigButton';

// Mock data de posts
const mockPosts = [
  {
    id: 1,
    author: {
      name: 'Blaž Urbanč',
      username: '@blaz_u',
      avatar: '👨',
      verified: false,
      isMedical: false
    },
    content: '¡Hoy cumplí mi meta de 30 minutos de fisioterapia! 💪 Pequeños pasos hacia grandes logros. #SMAWarrior #Fisioterapia',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600',
    likes: 24,
    likedBy: ['María G.', 'Juan P.', 'Ana L.', '+21 más'],
    comments: [
      { id: 11, author: 'María G.', avatar: '👩', text: '¡Increíble progreso! 🎉', verified: false },
      { id: 12, author: 'Dr. Osredkar', avatar: '⚕️', text: 'Excelente adherencia al tratamiento', verified: true, isMedical: true }
    ],
    timestamp: '2 horas',
    hashtags: ['#SMAWarrior', '#Fisioterapia']
  },
  {
    id: 2,
    author: {
      name: 'Dr. Jana Osredkar',
      username: '@dr_osredkar',
      avatar: '⚕️',
      verified: true,
      isMedical: true
    },
    content: 'Nuevo estudio sobre Risdiplam muestra mejoras significativas en función motora. Link en comentarios. #SMA #Research #Accessibility',
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600',
    likes: 89,
    likedBy: ['Carlos M.', 'Lucía S.', 'Blaž U.', '+86 más'],
    comments: [
      { id: 21, author: 'Carlos M.', avatar: '👨', text: 'Muy esperanzador', verified: false },
      { id: 22, author: 'Ana L.', avatar: '👧', text: 'Gracias por compartir, doctora', verified: false }
    ],
    timestamp: '5 horas',
    hashtags: ['#SMA', '#Research', '#Accessibility']
  },
  {
    id: 3,
    author: {
      name: 'María González',
      username: '@maria_g',
      avatar: '👩',
      verified: false,
      isMedical: false
    },
    content: 'Probé el nuevo restaurante en Ljubljana Centro - 100% accesible y con menú adaptado. ¡Recomendado! 🍕 #Gastronomía #Accessibility',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600',
    likes: 42,
    likedBy: ['Juan P.', 'Lucía S.', '+40 más'],
    comments: [
      { id: 31, author: 'Juan P.', avatar: '🧑', text: '¿Cuál es el nombre? Quiero ir!', verified: false },
      { id: 32, author: 'María G.', avatar: '👩', text: 'Pizzeria Foculus, en Stari trg', verified: false }
    ],
    timestamp: '1 día',
    hashtags: ['#Gastronomía', '#Accessibility']
  },
  {
    id: 4,
    author: {
      name: 'Carlos Martínez',
      username: '@carlos_m',
      avatar: '👨',
      verified: false,
      isMedical: false
    },
    content: 'Mi experiencia con Spinraza después de 2 años: La movilidad en brazos mejoró un 30%. No es magia, pero ayuda. #SMAType3 #RealTalk',
    image: null,
    likes: 67,
    likedBy: ['Blaž U.', 'Ana L.', 'María G.', '+64 más'],
    comments: [
      { id: 41, author: 'Ana L.', avatar: '👧', text: 'Gracias por compartir tu experiencia real', verified: false },
      { id: 42, author: 'Dr. Osredkar', avatar: '⚕️', text: 'Los datos reales de pacientes son invaluables', verified: true, isMedical: true }
    ],
    timestamp: '2 días',
    hashtags: ['#SMAType3', '#RealTalk']
  }
];

export function SocialFeedView({ navigate }) {
  const [posts, setPosts] = useState(mockPosts);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [showCommentsModal, setShowCommentsModal] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [newPost, setNewPost] = useState({ content: '', image: null });

  const handleLike = (postId) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, likes: post.likes + 1, likedBy: ['Tú', ...post.likedBy] }
        : post
    ));
  };

  const handleComment = (post) => {
    setSelectedPost(post);
    setShowCommentsModal(true);
  };

  const submitComment = () => {
    if (!newComment.trim()) return;

    setPosts(posts.map(post => 
      post.id === selectedPost.id 
        ? {
            ...post,
            comments: [
              ...post.comments,
              {
                id: Date.now(),
                author: 'Tú',
                avatar: '👤',
                text: newComment,
                verified: false
              }
            ]
          }
        : post
    ));

    setNewComment('');
    setShowCommentsModal(false);
  };

  const handleShare = (post) => {
    alert(`Compartiendo: "${post.content.substring(0, 50)}..."`);
  };

  return (
    <div className="max-w-4xl mx-auto pb-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black text-gray-900 mb-2">
            🌍 Feed Social
          </h1>
          <p className="text-xl text-gray-600">
            Comunidad SMA Eslovenia
          </p>
        </div>
        
        {/* Botón Chat General */}
        <button
          onClick={() => alert('Chat General - Próximamente')}
          className="bg-roche-blue text-white px-6 py-3 rounded-full font-semibold hover:bg-roche-blue/90 transition-colors flex items-center gap-2"
        >
          <MessageSquare className="w-5 h-5" />
          Chat
        </button>
      </div>

      {/* Hashtags Populares */}
      <div className="bg-white rounded-2xl shadow-md p-6 mb-8">
        <h3 className="font-bold mb-4">🔥 Trending Hashtags</h3>
        <div className="flex flex-wrap gap-2">
          {['#SMAWarrior', '#Accessibility', '#Fisioterapia', '#Research', '#SMAType2', '#SMAType3', '#RealTalk', '#Gastronomía'].map((tag) => (
            <button
              key={tag}
              className="bg-roche-blue/10 text-roche-blue px-4 py-2 rounded-full font-semibold hover:bg-roche-blue/20 transition-colors"
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Feed de Posts */}
      <div className="space-y-8">
        {posts.map((post) => (
          <div key={post.id} className="bg-white rounded-3xl shadow-xl overflow-hidden">
            {/* Header del Post */}
            <div className="p-6 flex items-start justify-between">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-gradient-to-br from-roche-blue to-vitality-purple rounded-full flex items-center justify-center text-3xl">
                  {post.author.avatar}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-lg">{post.author.name}</h3>
                    {post.author.verified && (
                      <div className={`
                        px-2 py-1 rounded-full text-xs flex items-center gap-1
                        ${post.author.isMedical 
                          ? 'bg-vitality-purple text-white' 
                          : 'bg-roche-blue text-white'
                        }
                      `}>
                        <CheckCircle className="w-3 h-3" />
                        {post.author.isMedical ? 'Médico' : 'Verificado'}
                      </div>
                    )}
                  </div>
                  <p className="text-sm text-gray-500">
                    {post.author.username} • {post.timestamp}
                  </p>
                </div>
              </div>
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <MoreVertical className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            {/* Contenido del Post */}
            <div className="px-6 pb-4">
              <p className="text-lg text-gray-800 leading-relaxed">
                {post.content.split(/(#\w+)/g).map((part, idx) => 
                  part.startsWith('#') ? (
                    <span key={idx} className="text-roche-blue font-semibold">
                      {part}
                    </span>
                  ) : (
                    <span key={idx}>{part}</span>
                  )
                )}
              </p>
            </div>

            {/* Imagen del Post */}
            {post.image && (
              <div className="relative h-96 bg-gray-200">
                <div 
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${post.image})` }}
                />
              </div>
            )}

            {/* Información de Likes */}
            {post.likedBy.length > 0 && (
              <div className="px-6 py-3 border-b border-gray-100">
                <p className="text-sm text-gray-600">
                  ❤️ Les gusta a <span className="font-semibold">{post.likedBy[0]}</span>
                  {post.likedBy.length > 1 && (
                    <span> y <span className="font-semibold">{post.likedBy[post.likedBy.length - 1]}</span></span>
                  )}
                </p>
              </div>
            )}

            {/* Botones de Acción */}
            <div className="px-6 py-4 flex items-center gap-6 border-b border-gray-100">
              <button
                onClick={() => handleLike(post.id)}
                className="flex items-center gap-2 text-gray-600 hover:text-red-500 transition-colors font-semibold"
              >
                <Heart className="w-6 h-6" />
                <span>{post.likes}</span>
              </button>

              <button
                onClick={() => handleComment(post)}
                className="flex items-center gap-2 text-gray-600 hover:text-roche-blue transition-colors font-semibold"
              >
                <MessageCircle className="w-6 h-6" />
                <span>{post.comments.length}</span>
              </button>

              <button
                onClick={() => handleShare(post)}
                className="flex items-center gap-2 text-gray-600 hover:text-growth-green transition-colors font-semibold"
              >
                <Share2 className="w-6 h-6" />
                <span>Compartir</span>
              </button>
            </div>

            {/* Últimos Comentarios */}
            {post.comments.length > 0 && (
              <div className="px-6 py-4 space-y-3">
                {post.comments.slice(0, 2).map((comment) => (
                  <div key={comment.id} className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-lg">
                      {comment.avatar}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-sm">{comment.author}</span>
                        {comment.verified && comment.isMedical && (
                          <div className="bg-vitality-purple text-white px-2 py-0.5 rounded-full text-xs flex items-center gap-1">
                            <CheckCircle className="w-2 h-2" />
                            Médico
                          </div>
                        )}
                      </div>
                      <p className="text-gray-700">{comment.text}</p>
                    </div>
                  </div>
                ))}
                {post.comments.length > 2 && (
                  <button
                    onClick={() => handleComment(post)}
                    className="text-gray-500 text-sm font-semibold hover:text-roche-blue"
                  >
                    Ver los {post.comments.length} comentarios
                  </button>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Botón Flotante Crear Post */}
      <button
        onClick={() => setShowCreateModal(true)}
        className="fixed bottom-24 right-6 sm:right-8 bg-joy-orange text-white rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-transform z-30 group"
        style={{ width: '80px', height: '80px' }}
      >
        <Plus className="w-12 h-12 mx-auto" strokeWidth={3} />
        <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-black/80 text-white px-4 py-2 rounded-full font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
          Crear Post
        </span>
      </button>

      {/* Modal Crear Post */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 animate-fade-in">
          <div className="bg-white rounded-3xl w-full max-w-2xl p-8 animate-bounce-in">
            <h2 className="text-3xl font-black mb-6">✨ Crear Nuevo Post</h2>

            <div className="space-y-6">
              {/* Área de Texto */}
              <div>
                <textarea
                  value={newPost.content}
                  onChange={(e) => setNewPost({...newPost, content: e.target.value})}
                  placeholder="¿Qué quieres compartir con la comunidad? Usa #hashtags..."
                  className="w-full px-6 py-4 text-lg border-2 border-gray-300 rounded-2xl focus:border-roche-blue focus:outline-none resize-none"
                  rows={6}
                />
              </div>

              {/* Subir Foto */}
              <div className="border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center hover:border-roche-blue transition-colors cursor-pointer">
                <div className="text-6xl mb-4">📸</div>
                <p className="text-gray-600 mb-2">Añadir foto (opcional)</p>
                <p className="text-sm text-gray-400">Click para seleccionar desde tu galería</p>
              </div>

              {/* Hashtags Sugeridos */}
              <div>
                <p className="font-semibold mb-2">Hashtags sugeridos:</p>
                <div className="flex flex-wrap gap-2">
                  {['#SMAWarrior', '#Accessibility', '#Fisioterapia', '#Research'].map((tag) => (
                    <button
                      key={tag}
                      onClick={() => setNewPost({...newPost, content: newPost.content + ' ' + tag})}
                      className="bg-gray-100 hover:bg-roche-blue/10 text-gray-700 px-3 py-2 rounded-full text-sm transition-colors"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>

              {/* Botones */}
              <div className="flex gap-3">
                <BigButton
                  variant="success"
                  fullWidth
                  onClick={() => {
                    if (newPost.content.trim()) {
                      alert('¡Post publicado con éxito!');
                      setShowCreateModal(false);
                      setNewPost({ content: '', image: null });
                    }
                  }}
                  disabled={!newPost.content.trim()}
                >
                  Publicar
                </BigButton>
                <BigButton variant="ghost" onClick={() => setShowCreateModal(false)}>
                  Cancelar
                </BigButton>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Comentarios */}
      {showCommentsModal && selectedPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 animate-fade-in">
          <div className="bg-white rounded-3xl w-full max-w-2xl p-8 animate-bounce-in max-h-[80vh] overflow-y-auto">
            <h2 className="text-2xl font-black mb-6">
              💬 Comentarios ({selectedPost.comments.length})
            </h2>

            {/* Lista de Comentarios */}
            <div className="space-y-4 mb-6">
              {selectedPost.comments.map((comment) => (
                <div key={comment.id} className="flex items-start gap-4 p-4 bg-gray-50 rounded-2xl">
                  <div className="w-12 h-12 bg-gradient-to-br from-roche-blue to-vitality-purple rounded-full flex items-center justify-center text-2xl">
                    {comment.avatar}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-bold">{comment.author}</span>
                      {comment.verified && comment.isMedical && (
                        <div className="bg-vitality-purple text-white px-2 py-1 rounded-full text-xs flex items-center gap-1">
                          <CheckCircle className="w-3 h-3" />
                          Médico
                        </div>
                      )}
                    </div>
                    <p className="text-gray-700">{comment.text}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Escribir Comentario */}
            <div className="border-t pt-6">
              <div className="flex gap-3">
                <input
                  type="text"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Escribe un comentario..."
                  className="flex-1 px-6 py-4 text-lg border-2 border-gray-300 rounded-full focus:border-roche-blue focus:outline-none"
                  onKeyPress={(e) => e.key === 'Enter' && submitComment()}
                />
                <button
                  onClick={submitComment}
                  disabled={!newComment.trim()}
                  className="w-16 h-16 bg-roche-blue text-white rounded-full flex items-center justify-center hover:bg-roche-blue/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-6 h-6" />
                </button>
              </div>
            </div>

            <div className="mt-6">
              <BigButton variant="ghost" fullWidth onClick={() => setShowCommentsModal(false)}>
                Cerrar
              </BigButton>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
