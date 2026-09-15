import { useState, useEffect } from 'react';
import { supabase, type SiteImage } from '@/lib/supabase';

export function useImages(category: string) {
  const [images, setImages] = useState<SiteImage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    const fetch = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('site_images')
        .select('*')
        .eq('category', category)
        .order('display_order', { ascending: true });
      if (!cancelled && !error) {
        setImages(data as SiteImage[]);
      }
      if (!cancelled) setLoading(false);
    };
    fetch();
    return () => { cancelled = true; };
  }, [category]);

  return { images, loading };
}

export function useAllImages() {
  const [images, setImages] = useState<SiteImage[]>([]);
  const [loading, setLoading] = useState(true);

  const refresh = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('site_images')
      .select('*')
      .order('category', { ascending: true })
      .order('display_order', { ascending: true });
    if (!error) setImages(data as SiteImage[]);
    setLoading(false);
  };

  useEffect(() => {
    refresh();
  }, []);

  return { images, loading, refresh };
}
