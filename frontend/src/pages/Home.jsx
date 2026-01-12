import { useState } from 'react';
import { Link } from 'react-router-dom';
import { PenLine, MessageCircle, Users } from 'lucide-react';
import { Typewriter } from 'react-simple-typewriter';
import Button from '../components/Button';
import Card from '../components/Card';
import Input from '../components/Input';
import Textarea from '../components/Textarea';

export default function Home() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', message: '' });
    }, 4500);
  };

  const testimonials = [
    {
      name: 'Budi Santoso',
      role: 'Senior Frontend Engineer',
      quote:
        'Akhirnya ada platform lokal yang clean dan fokus ke konten teknis. Editornya enak banget buat nulis tutorial React + TypeScript.',
      avatar: 'BS',
    },
    {
      name: 'Siti Aisyah',
      role: 'DevOps Engineer',
      quote:
        'Suka banget sama tag system-nya. Artikel CI/CD dan Kubernetes aku gampang banget ketemu komunitas yang sama-sama ngerti.',
      avatar: 'SA',
    },
    {
      name: 'Rian Nugraha',
      role: 'Fullstack Developer',
      quote:
        'Dari nulis catatan kecil tentang debugging sampai tutorial besar, semuanya nyaman. Dark mode-nya juga mantap buat begadang.',
      avatar: 'RN',
    },
    {
      name: 'Dewi Lestari',
      role: 'Mobile Developer',
      quote:
        'Pertama kali nulis artikel tentang Jetpack Compose di sini, ternyata banyak yang appreciate dan kasih feedback bagus!',
      avatar: 'DL',
    },
  ];

  return (
    <div className="min-h-screen bg-white text-black flex flex-col">
      <main className="flex-grow">
        <section className="py-16 md:py-24 border-b border-gray-200 bg-gradient-to-b from-white to-gray-50">
          <div className="container mx-auto px-4 text-center">
            <div className="mb-6 font-mono text-gray-500 text-lg md:text-2xl tracking-wider h-10">
              <Typewriter
                words={['> print("welcome dev!")']}
                loop={0}
                cursor
                cursorStyle="|"
                typeSpeed={60}
                deleteSpeed={40}
                delaySpeed={2000}
              />
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              Tempat Developer
              <br />
              <span className="text-gray-500">Berbagi & Belajar</span>
            </h1>

            <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-3xl mx-auto">
              Tulis artikel teknis, tutorial, pengalaman proyek, hingga catatan harian coding bersama ribuan developer Indonesia lainnya.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link to="/article">
                <Button className="text-lg px-10 py-4 font-medium">
                  Mulai Tulis Artikel
                </Button>
              </Link>
              <Link to="/register">
                <button className="px-10 py-4 text-lg font-medium border-2 border-black hover:bg-black hover:text-white transition">
                  Daftar Gratis
                </button>
              </Link>
            </div>
          </div>
        </section>

        <section className="py-24 bg-white">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-16">
              Apa itu DevShare?
            </h2>

            <div className="grid md:grid-cols-2 gap-12 items-start">
              <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
                <p>
                  <strong className="text-black">DevShare</strong> adalah platform
                  berbagi pengetahuan <span className="font-semibold text-black">khusus developer Indonesia</span> yang fokus pada konten teknis berkualitas.
                </p>
                <p>
                  Di sini kamu tidak sekadar menulis, tapi membangun reputasi,
                  berdiskusi, dan tumbuh bersama komunitas developer dengan minat
                  dan tech stack yang sama.
                </p>
                <div className="pt-6">
                  <Link to="/login">
                    <Button className="px-10 py-4 text-lg font-medium">
                      Mulai Berkontribusi →
                    </Button>
                  </Link>
                </div>
              </div>

              <div className="grid gap-6">
                <Card>
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-black text-white rounded-lg">
                      <PenLine size={24} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">Editor Nyaman</h3>
                      <p className="text-gray-600">
                        Fokus menulis artikel teknis tanpa distraksi dengan editor modern dan familiar.
                      </p>
                    </div>
                  </div>
                </Card>

                <Card>
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-black text-white rounded-lg">
                      <MessageCircle size={24} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">Diskusi Berkualitas</h3>
                      <p className="text-gray-600">
                        Dapatkan feedback konstruktif, komentar relevan, dan insight dari sesama developer.
                      </p>
                    </div>
                  </div>
                </Card>

                <Card>
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-black text-white rounded-lg">
                      <Users size={24} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">Komunitas Se-Tech Stack</h3>
                      <p className="text-gray-600">
                        Temukan developer dengan minat, tools, dan stack teknologi yang sama.
                      </p>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </section>
        <section className="py-16 bg-gray-50 border-y border-gray-200">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center max-w-5xl mx-auto">
              <div>
                <div className="text-4xl md:text-5xl font-bold mb-2">1.2K+</div>
                <p className="text-gray-600">Artikel</p>
              </div>
              <div>
                <div className="text-4xl md:text-5xl font-bold mb-2">4.8K+</div>
                <p className="text-gray-600">Developer</p>
              </div>
              <div>
                <div className="text-4xl md:text-5xl font-bold mb-2">28K+</div>
                <p className="text-gray-600">Komentar</p>
              </div>
              <div>
                <div className="text-4xl md:text-5xl font-bold mb-2">97%</div>
                <p className="text-gray-600">Kepuasan</p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Apa Kata Mereka
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
              {testimonials.map((t, i) => (
                <Card key={i} className="h-full flex flex-col">
                  <p className="text-gray-700 italic mb-6 leading-relaxed">
                    "{t.quote}"
                  </p>
                  <div className="flex items-center gap-4 mt-auto">
                    <div className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center font-bold text-lg">
                      {t.avatar}
                    </div>
                    <div>
                      <p className="font-bold">{t.name}</p>
                      <p className="text-sm text-gray-600">{t.role}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 border-t border-gray-200">
          <div className="container mx-auto px-4 max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">
              Hubungi Kami
            </h2>

            <p className="text-center text-gray-600 mb-10">
              Punya pertanyaan, saran, atau ingin berkolaborasi? Silakan isi form di bawah ini.
            </p>

            {submitted ? (
              <div className="text-center py-10 px-8 bg-gray-50 border border-gray-200 rounded-lg">
                <h3 className="text-2xl font-bold mb-3">Terima kasih!</h3>
                <p className="text-gray-600 text-lg">
                  Pesan kamu sudah kami terima. Kami akan segera menghubungi kamu.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Nama
                  </label>
                  <Input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Email
                  </label>
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Pesan
                  </label>
                  <Textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="text-center pt-4">
                  <Button
                    type="submit"
                    className="px-12 py-4 text-lg"
                    disabled={!formData.name || !formData.email || !formData.message}
                  >
                    Kirim Pesan
                  </Button>
                </div>
              </form>
            )}

            <p className="text-center mt-8 text-sm text-gray-500">
              Atau langsung email ke <span className="font-medium">hello@devshare.id</span>
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
