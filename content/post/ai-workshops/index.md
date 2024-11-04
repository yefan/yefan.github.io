---
title: Behind the scenes of my first workshops
description: Multimodal embedding and AI agents
slug: ai-agent
date: 2024-11-03 00:00:00+0000
image: teaser-3.png
categories:
    - Programming
weight: 1       # You can add weight to some posts to override the default sorting (date descending)
---

It all started one day, when my old friend [Annie](https://www.thriveup.co/) reached out to me asking if I would be interested in doing an AI workshop together. Sure, that sounded like a cool idea, well except a small problem, I didn't know much about AI. But what could be a better way to learn than teaching it? Alright, let's do it! (Annie is more versed in AI, so we are not completely clueless)

The good thing is that I didn't start from scratch. My specialty in numerics and physics simulation provided much needed knowledge for picking up the math behind AI. I've also done plenty of software development in the past, so getting some code up and running is not very hard for me. It wasn't exactly a smooth journey, but I think we were doing pretty well. As I was exploring various topics, I found multimodal embedding and ai agents very interesting, and tried to incorporate them into the [workshops](https://github.com/yefan/image-agent-workshop).

On the multimodal embedding side, the CLIP paper from OpenAI more or less laid the groundwork. That paper is not hard to read, especially just the conceptual understanding that text embedding and image embedding can be in the same space. Built on top of that, zero-shot image classification is a straightforward application. It's a small and neat idea, but led to an ah ha moment in my mind. An old problem now is solved in a few lines of python. Beautiful! I'm definitely going to introduce this topic in the workshop. Other applications of contrastive learning are immense too. Audio, video, 3D mesh, depth images, proteins, to name a few. Going from there, I further explored object detection using the same CLIP mechanism. It's basically the owl model from google. This one is a bit complicated so I don't think there's enough time to do much in a workshop other than using it. But essentially, that model replaces the output layer by an object detection head, and adds bounding box embeddings to the model. The really cool part is that it can detect objects based on user query, and can return multiple objects with their bounding boxes. How cool is that?

Another interesting and also popular topic is agents. Particularly with tools, agents can interact with private data sources, and the physical world through function calls. This makes LLM go beyond chatting. One very good use case is code agent, for example, cursor. It makes code changes directly in the editor by conversing with the programmer. It's a very good case because this type of agent has been widely adopted. During my exploration of the workshop material, I've come across many other agentic applications, but most of them are toy examples for illustrating a point. It's surprisingly hard to find good material that's neither too complicated or too basic. I want to develop some demo material not too far from real applications, yet, something I could cover in a couple of hours. Eventually I decided to do an image editing agent. It basically does a replacement in-paint job based on user input. If the user asks to replace the horse in the image with a cow, they might get an image like the one I have for this post. This agent touches on object detection mentioned above, OpenAI assistance framework, and text-to-image generation. It's also very close to real applications. After the workshop, I discovered the OpenArt app. It's packed with nice  image editing features powered by AI, and they have the exact feature called image replacement!

Overall, it was a great experience for me! I've learnt a lot and had so much fun. I feel connected with the local tech community, as well as the university students. I couldn't thank more for the opportunity Annie provided.

So, what's next? The AI community has been pushing hard forward. For example, llama 3.2 and OpenAI o1 had been released. On the product side, Google notebook, OpenAi search were out recently. We are still early in this AI era, there's much to learn and play. I very much hope we would continue the workshops in the future, and explore other cool areas.
