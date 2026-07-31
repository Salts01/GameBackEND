FROM python:3.10

RUN useradd pyuser && \
	mkdir apps && \
	mkdir apps/python

COPY ./* apps/python

RUN chown pyuser:pyuser -R  apps/python	

WORKDIR apps/python

EXPOSE 8000

RUN pip3 install --no-cache-dir -r requirements.txt

USER pyuser

CMD ["uvicorn","main:api","--host","0.0.0.0","--port","8000"] 
